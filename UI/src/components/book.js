import React, { Component } from 'react';
import {Fieldset} from 'primereact/fieldset';
import {InputSwitch} from 'primereact/inputswitch';
import axios from 'axios';
import {Calendar} from 'primereact/calendar';
import {backendUrlBooking} from '../BackendURL';
import Booksuccess from "./booksuccess";

var numeral = require('numeral')
class Book extends Component {
    constructor(props){
        super(props);
        this.state = { 
            includeFlight: sessionStorage.getItem("flightInclude") === "true",
            userId : sessionStorage.getItem("userId"),
            destDetails : "",
            errorMessage : "",
            bookingData:"",
            errorMessage:"",
            formValue : {
                noOfPersons : sessionStorage.getItem("travellersCount"),
                tripStartDate : sessionStorage.getItem("startDate"),
                tripEndDate : sessionStorage.getItem("checkOutDate"),
                flightInclude : sessionStorage.getItem("flightInclude"),
                totalcharges : sessionStorage.getItem("totalCharges")
            },
            formErrorMessage : {
                noOfPersons : "",
                tripStartDate : "",
            },
            formValid : {
                noOfPersons : true,
                tripStartDate : true,
                buttonActive : true,
            },
            bookObj : {
                flightInclude:"",
                checkInDate : "",
                noOfPersons : ""
            },
            bookingStatus : false
        };
    }

    calculateCharges = () => {
        if(this.state.includeFlight===false){
            let totalCharges1 = this.state.formValue.noOfPersons * this.state.destDetails.chargesPerPerson;
            const {formValue} = this.state;
            this.setState({formValue : {...formValue,totalcharges : totalCharges1}});
        }else if(this.state.includeFlight===true){
            let totalCharges2 = (this.state.formValue.noOfPersons * this.state.destDetails.chargesPerPerson) + (this.state.destDetails.flightCharges * this.state.formValue.noOfPersons);
            const {formValue} = this.state;
            this.setState({formValue : {...formValue,totalcharges : totalCharges2}});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.submitBooking();
    };
    submitBooking = () => {
        const {formValue} = this.state;
        formValue.checkInDate = this.state.formValue.tripStartDate;
        formValue.noOfPersons = Number(this.state.formValue.noOfPersons);
        formValue.includeFlight = (this.state.formValue.includeFlight);
        let userId = this.state.userId;
        let destId = this.props.match.params.destId;
        console.log(formValue)
        axios.post(backendUrlBooking+"/"+userId+"/"+destId,formValue).then((success)=>{
            this.setState({bookingStatus : true,bookingData:success.data, errorMessage :""})
        }).catch((error)=>{
            this.setState({bookingStatus : true,bookingData:"", errorMessage:error.response.data.message})
        })
    }

    handleChange = (event) => {
        let inputname = event.target.name;
        let inputvalue = event.target.value;
        let tempformValueObj = this.state.formValue;
        switch (inputname) {
            case "noOfPersons":
                tempformValueObj.noOfPersons = inputvalue;
                this.setState({formValue : tempformValueObj});
                this.validateField(inputname,inputvalue);
                this.calculateCharges();
                break;
            case "includeFlight":
                this.setState({includeFlight:inputvalue},() => {this.calculateCharges();});
                break;
            case "tripStartDate":
                tempformValueObj.tripStartDate = inputvalue;
                this.setState({formValue : tempformValueObj});
                this.validateField(inputname,inputvalue);
                break;        
            default:
                break;
        }
    };

    validateField = (feildName,value) => {
        let formValidObj = this.state.formValid;
        let formErrorMessageObj = this.state.formErrorMessage;
        switch (feildName) {
            case "noOfPersons":
                if(value === ""){
                    formErrorMessageObj.noOfPersons = "Feild required";
                    this.setState({formErrorMessage : formErrorMessageObj});
                    formValidObj.noOfPersons = false;
                    this.setState({formValid : formValidObj});
                }else if(value < 1){
                    formErrorMessageObj.noOfPersons = "Minimum Number of travellers must be 1";
                    this.setState({formErrorMessage : formErrorMessageObj});
                    formValidObj.noOfPersons = false;
                    this.setState({formValid : formValidObj});
                }else if(value > 5){
                    formErrorMessageObj.noOfPersons = "Maximum Number of travellers can be 5";
                    this.setState({formErrorMessage : formErrorMessageObj});
                    formValidObj.noOfPersons = false;
                    this.setState({formValid : formValidObj});
                }else{
                    formErrorMessageObj.noOfPersons = "";
                    this.setState({formErrorMessage : formErrorMessageObj});
                    formValidObj.noOfPersons = true;
                    this.setState({formValid : formValidObj});
                }
                break;
            case "tripStartDate":
                var today = new Date();
                var tdate = new Date(value);
                if(value === ""){
                    formErrorMessageObj.tripStartDate = "Feild required";
                    this.setState({formErrorMessage : formErrorMessageObj});
                    formValidObj.tripStartDate = false;
                    this.setState({formValid : formValidObj});
                }else if(tdate <= today){
                    formErrorMessageObj.tripStartDate = "Start Date must be after today";
                    this.setState({formErrorMessage : formErrorMessageObj});
                    formValidObj.tripStartDate = false;
                    this.setState({formValid : formValidObj});
                }else{
                    formErrorMessageObj.tripStartDate = "";
                    this.setState({formErrorMessage : formErrorMessageObj});
                    formValidObj.tripStartDate = true;
                    this.setState({formValid : formValidObj});
                }
                break;        
            default:
                break;
        }
        if(this.state.formValid.noOfPersons && this.state.formValid.tripStartDate){
            formValidObj.buttonActive = true;
            this.setState({formValid : formValidObj});
        }else{
            formValidObj.buttonActive = false;
            this.setState({formValid : formValidObj});
        }
    };

    fetchDestDetail = () =>{
        axios.get(backendUrlBooking+"/getDetails/"+this.props.match.params.destId).then((successresponse)=>{
            if(successresponse){
            this.setState({destDetails : successresponse.data});
            }
        }).catch((errorresponse)=>{
            this.setState({errorMessage : errorresponse.message});
        })
    }

    componentWillMount = () =>{
        
        this.fetchDestDetail();
    }

    render() {
        var overview = this.state.destDetails && this.state.destDetails.details ? this.state.destDetails.details.about : null;
        var packageInclusions = this.state.destDetails && this.state.destDetails.details ? this.state.destDetails.details && this.state.destDetails.details.itinerary ? this.state.destDetails.details.itinerary && this.state.destDetails.details.itinerary.packageInclusions ? this.state.destDetails.details.itinerary.packageInclusions : null : null : null;
        // var itinerary1=this.state.destDetails && this.state.destDetails.details ? this.state.destDetails.details && this.state.destDetails.details.itinerary ? this.state.destDetails.details.itinerary && this.state.destDetails.details.itinerary.day ? this.state.destDetails.details.itinerary.packageInclusions : null : null : null;
        //  console.log(itinerary)
         
        return (
            <React.Fragment>
            {!this.state.bookingStatus ?
            <div className={'row text-left'} >
                <div className={'col-md-6 offset-md-1'} style={{marginTop:100,marginBottom:100}} >
                    <h1>{this.state.destDetails.name}</h1>
                    <Fieldset legend="Overview" toggleable={true} collapsed={true} >
                        {overview}
                    </Fieldset>
                    <Fieldset legend="Package Inclusions" toggleable={true} collapsed={true} >
                        <div>
                            {console.log(packageInclusions)}
                            {console.log(typeof packageInclusions)}
                            <ul>
                               {/* {packageInclusions.forEach(element => {
                                   return <li>{element}</li>
                               })} */}
                               {packageInclusions}
                            </ul>
                            
                        </div>
                    </Fieldset>
                    <Fieldset legend="itinerary" toggleable={true} collapsed={true} >
                    {this.state.destDetails?
                    <div className="text-left">
                          <h6>Day 1</h6>
                          <p>{this.state.destDetails.details.itinerary.dayWiseDetails.firstDay}</p>
                          {this.state.destDetails.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((data,index)=>{
                               
                                    return (
                                        <div key={index}>
                                        <h6>Day {index+2}</h6>
                                         <p>{data}</p>
                                         </div>
                                        )
                                     })} 
                            <h6>Day {(this.state.destDetails.details.itinerary.dayWiseDetails.restDaysSightSeeing).length+2}</h6>
                          <p>{this.state.destDetails.details.itinerary.dayWiseDetails.lastDay}</p>
                           <div className="text-danger">**This itinerary is just a suggestion,itinerary can be modified as per requirement.
                           <span className="text-info"> Contact us </span>for more details.
                           </div>
                           </div>
                        :null}  
                    </Fieldset>
                    <div>{this.state.errorMessage}</div>
                </div>
                <div className={'col-md-4 ml-2 border'} style={{marginTop:100,marginBottom:100}} >
                    <form className={'form'} style={{padding:20}} onSubmit={this.handleSubmit} >
                        <div className={'form-group'} >
                            <label>Number of Travellers</label>
                            <input type="number" name="noOfPersons" value={this.state.formValue.noOfPersons} className={'form-control'} onChange={this.handleChange} ></input>
                            <span className={'text-danger'} name="noOfPersonsError" > {this.state.formErrorMessage.noOfPersons} </span>
                        </div>
                        <div className={'form-group'} >
                            <label>Trip Start Date</label>
                            <input type="Date" name="tripStartDate" value={this.state.formValue.tripStartDate} className={'form-control'} onChange={this.handleChange} ></input>
                            <span className={'text-danger'} > {this.state.formErrorMessage.tripStartDate} </span>
                        </div>
                        <div>
                            <label>Include Flights: </label>
                            <InputSwitch checked={this.state.includeFlight} name="includeFlight" onChange={this.handleChange} />
                        </div>
                        <div>
                            <span className="text-info">Your trip ends on : {this.state.formValue.tripEndDate}</span>
                            {this.state.formErrorMessage.noOfPersons || this.state.formErrorMessage.tripStartDate ? null:<span><h3>You Pay: {numeral(this.state.formValue.totalcharges).format('($0,0.00)')}</h3></span>}
                        </div>
                            <button label="Confirm Booking" className={'btn btn-primary'} disabled = {!(this.state.formValid.buttonActive)} >Confirm Booking</button>
                            <button label="Go Back" className={'ml-2 btn btn-primary'} >Go Back</button>
                    </form>
                </div>

            </div> : <Booksuccess data={this.state.bookingData} errorMessage={this.state.errorMessage}/>}
            </React.Fragment>
        );
    }
}

export default Book;