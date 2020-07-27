import React, {Component} from 'react';
import {  Redirect} from "react-router-dom";
import {TabView,TabPanel} from 'primereact/tabview';
import {InputSwitch} from 'primereact/inputswitch';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import {ScrollPanel} from 'primereact/scrollpanel';
import {Dialog} from 'primereact/dialog';
var numeral = require('numeral');

export class TabViewDemo extends Component {
    constructor(props){
        super(props);

     this.state={
      //  displayCharges:"",
       flightInclude:false,
         formValue:{
           travellersCount:"",
           startDate:"",
           
         },
         formErrorMessage:{
             travellersCount:"",
             startDate:""
         },
         formValid:{
            travellersCount:"",
            startDate:"",
            buttonActive:false

         },
          redirect:"",
          dailogVisible:false,
          successMessage:""
     }
    }

    validateField = (fieldName, value) => {
        /* 
          Perform validation as given in QP and assign error message
        */
      
       let fieldValidationErrors = this.state.formErrorMessage;
       let formValid = this.state.formValid;
    switch(fieldName){
     case "travellersCount":
    if (value === "") {
      fieldValidationErrors.travellersCount= "field required"
      formValid.travellersCount = false;
    } else {
      if (value>=1 && value<=5) {
        fieldValidationErrors.travellersCount= "";
        formValid.travellersCount= true;
        
      } else {
        fieldValidationErrors.travellersCount = "Number of Travellers sholud be in the range of 1 to 5";
        formValid.travellersCount = false;
       
      }
    }
    break;
    case "startDate":
    if (value === "") {
        fieldValidationErrors.startDate= "field required"
        formValid.startDate = false;
      } 
      else
       {
        
        let today = new Date();
        let bdate = new Date(value);
        if (bdate >today)
         {
          fieldValidationErrors.startDate= "";
          formValid.startDate= true;
          sessionStorage.setItem("checkOutDate",this.calculateCheckOutDate(value))
          
         } 
        else
         {
          fieldValidationErrors.startDate = "Booking date should  be after today's date";
          formValid.startDate = false;
         
         }
      }
      break;
      default:
      break;
       }

       formValid.buttonActive =
       formValid.startDate &&
       formValid.travellersCount
       this.setState({
       formErrorMessage: fieldValidationErrors,
       formValid: formValid,
       successMessage: ""
       });
      };


      formatDate = (date)=>{
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
     }


calculateCheckOutDate=(startDate)=>{
  var  destnObj=this.props.DestinationObj;
  var checkInDate=new Date(startDate);
  var format={year:'numeric',month:'long',day:'numeric'};
  var CheckoutDate=new Date(checkInDate.setDate(checkInDate.getDate()+destnObj.noOfNights));
  var checkOutDateformat = CheckoutDate
  sessionStorage.setItem("checkOutDateformat",this.formatDate(checkOutDateformat))
  var fullDate=(CheckoutDate.toLocaleString('en',format));
return fullDate

}

    calculateCharges=(event)=>{
      var  destnObj=this.props.DestinationObj;
        var charges=(this.state.formValue.travellersCount*destnObj.chargesPerPerson)
        var totlCharges=this.state.formValue.flightInclude===true?(charges+destnObj.flightCharges):charges
        sessionStorage.setItem("totalCharges",totlCharges);
      
      if(event.target.name === "calculateCharges"){
      this.setState({successMessage:"Your trip ends on "+this.calculateCheckOutDate(this.state.formValue.startDate)+" and you will pay $"+numeral(totlCharges).format('( $0,0.00)')})
      }else{
        this.redirct()
      }
    }
    handleChange = event => {
       const target = event.target;
       const value = target.value;
       const name = target.name;
       sessionStorage.setItem(name,value);
       const { formValue } = this.state;
       this.setState({formValue: { ...formValue, [name]: value}});
       this.validateField(name, value);
      };
      redirct=()=>{
        // var visible=false;
        var destnObj=this.props.DestinationObj
        if(!sessionStorage.getItem("userId"))
        {
          sessionStorage.clear();
          this.setState({dailogVisible:true})
        }
      else{
      var bookingUrl="/book/"+destnObj.destinationId;
        this.setState({redirect:<Redirect push to={bookingUrl}></Redirect>}) ;
          }
      }

    render() {
        var pkge=this.props.DestinationObj
        var image=this.props.DestinationObj.imageUrl.split("/")
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro text-left">
                        <h2>{pkge.name}</h2>
                    </div>
                </div>

                <div className="content-section implementation">
                    <TabView activeIndex={this.props.ActiveIndex} >
                        <TabPanel header="Overview">
                        < div className="row">
                            <div className="col-md-5 offset-0" style={{marginLeft:38, height:"100%"}}>
                              <img className="package-image" alt="destination comes here" src={require("../"+image[1]+"/"+image[2])} />
                            </div>
                            <div className="col-md-5 text-left"style={{marginLeft:38}} >
                                 <h4>Package Includes:</h4>
                                <ul>
                                    {pkge.details.itinerary.packageInclusions.map((data,index)=>{
                                    return ( <li key={index}>{data}</li>)
                                     })} 
                                </ul>
                            </div>

                        </div><br/>
                        <div className="row" >
                        <div className="col-md-11  text-justify" style={{marginLeft:38}}>
                        <h4>Tour Overview:</h4>
                        <p>{pkge.details.about}</p>
                        </div>
                        </div>
                        </TabPanel>
                        <TabPanel header="itinerary">
                        <ScrollPanel style={{width: '100%', height: '500px'}}>
                          <div className="text-left">
                          <h6>Day 1</h6>
                          <p>{pkge.details.itinerary.dayWiseDetails.firstDay}</p>
                          {pkge.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((data,index)=>{
                                    return (
                                        <div key={index+2}>
                                        <h6>Day {index+2}</h6>
                                         <p>{data}</p>
                                         </div>
                                        )
                                     })} 
                           <h6>Day {pkge.details.itinerary.dayWiseDetails.restDaysSightSeeing.length+2}</h6>
                           <p>{pkge.details.itinerary.dayWiseDetails.lastDay}</p>                     
                           <div className="text-danger">**This itinerary is just a suggestion,itinerary can be modified as per requirement.
                           <a className="text-info" href="/"> Contact us </a>for more details.
                           </div>
                           </div>
                           </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Book">
                        <form className="text-left" onSubmit={this.handleSubmit}>
                        <h4 >**Charges per person: {numeral(pkge.chargesPerPerson).format('( $0,0.00)')}</h4>
                           <div className="form-group">
                              <label>Number of Travelers:</label>
                              <input type="number"  name="travellersCount" placeholder="How many of you are coming??" className="form-control" onChange={this.handleChange }/>
                           </div>
                           <span name="travellersCountError" className="text-danger">{this.state.formErrorMessage.travellersCount}</span>
                           <div className="form-group">
                              <label>Trip start Date:</label>
                              <input type="date"  name="startDate"  className="form-control" onChange={this.handleChange}/>
                           </div>
                           {this.state.formErrorMessage.startDate?<span className="p-grid"><Message severity="error" text={this.state.formErrorMessage.startDate} showIcon={false} /></span>:null}
                           {/* <span name="startDateError" className="text-danger">{this.state.formErrorMessage.startDate}</span> */}
                          <br/>
                           <label>Include Flights:</label>
                           <span><InputSwitch name="flightInclude" checked={this.state.formValue.flightInclude} onChange={this.handleChange} /></span><br/>
                           <br/>                           
                           <button
                      type="button"
                     name="calculateCharges"
                      className="btn btn-info"
                      disabled={!this.state.formValid.buttonActive}
                      onClick={this.calculateCharges}
                    >
                    CALCULATE CHARGES
                    </button><br/><br/>

                    {this.state.successMessage?<span><h3>{this.state.successMessage}</h3></span>:<span>**Charges exculde flight charges</span>}
                    {/* {this.state.successMessage?<h5>{this.state.successMessage}</h5>:<span>**Charges exculde flight charges</span>}<br/> */}

                <div style={{textAlign:"center"}}>
                     <button
                      type="button"
                      className="btn btn-primary"
                      
                      disabled={!this.state.formValid.buttonActive}
                      onClick={this.calculateCharges}
                      //onClick={this.booking}
                      >
                      Book
                    </button> &nbsp;
                   <a href="/"> <button
                      type="button"
                      className="btn btn-primary"
                     // onClick={(e) => this.setState({redirect:<Redirect to="/login"></Redirect>})}
                      disabled={false}
                    >
                      Cancel
                    </button></a>
                    </div>  
                  </form>
                  {this.state.redirect}
                  {this.state.dailogVisible?<Dialog header="Alert" visible={this.state.dailogVisible} style={{width: '50vw'}} modal={true} onHide={() => this.setState({dailogVisible: false})}>
           <div className="text-center ">please log in to continue</div><br/>
           <button className="btn btn-blue"  onClick={() => this.setState({redirect:<Redirect to="/login"></Redirect>})} >Login</button>
        </Dialog>:null}
                        </TabPanel>
                        
                    </TabView>
                </div>
            </div>
        )
    }
}
export default TabViewDemo;