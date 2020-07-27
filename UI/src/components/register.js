import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import {backendUrlUser} from '../BackendURL';
import {Sidebar} from 'primereact/sidebar'
import {ProgressSpinner} from 'primereact/progressspinner';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerform: {
                name:"",
                emailId:"",
                contactNo: "",
                password: ""
            },
            registerformErrorMessage: {
                name:"",
                emailId:"",
                contactNo: "",
                password: ""
            },
            registerformValid: {
                name:false,
                emailId:false,
                contactNo: false,
                password: false,
                buttonActive:false
            },
            successMessage: "",
            errorMessage: "",
            registeredStatus : false,
            spinnerStatus : false

        }
    }

    handleRegistration = ()=>{
        this.setState({registeredStatus : false})
      }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { registerform } = this.state;
        this.setState({
            registerform: { ...registerform, [name]: value }
        });
        this.validateField(name, value);
    }

    register = () => {
        this.setState({spinnerStatus : true})

        /* 
         Write code for axios POST request 
         Handle success and error cases as mentioned in QP
        */
        axios.post(backendUrlUser + "/register",this.state.registerform).then(success=>{
                  // To make a refreshed page look after the submit button is pressed
            this.setState({successMessage : "Successfully Registered"})
            this.setState({registeredStatus : true,spinnerStatus : false})
        }).catch(error => {
          if (error.response) {
            this.setState({ errorMessage: error.response.data.message, successMessage: "",spinnerStatus : false });
          } else {
            this.setState({spinnerStatus : false, errorMessage: error.message, successMessage: "" });
          }
        })
      }


    handleSubmit = (event) => {
        event.preventDefault();
        this.register();
        
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.registerformErrorMessage;
        let formValid = this.state.registerformValid;
        console.log(value)
        switch (fieldName) {
            case "name":
            let nameexp=/[A-Za-z]$/
            if(nameexp.test(value)){
                fieldValidationErrors.name = "";
                formValid.name = true;
            }else{
                fieldValidationErrors.name = "Enter valid name";
                formValid.name = false;

            }
            break;
            case "contactNo":
                let cnoRegex = /^[6-9][0-9]{9}$/
                if (!value || value === ""|| value=="e") {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":

                   if(value){
                  var  exp= new RegExp(/(?=^.{7,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*]*$/)
                    if(exp.test(value)){
                    formValid.password=true
                
                fieldValidationErrors.password=""
                  }else{
                    formValid.password=false
                    fieldValidationErrors.password="Password must be a minimum of 7 characters and must contain a number,a special character and lower and uppercase letters"
                  }
                    // {exp.test(value)?(formValid.emailId=true,fieldValidationErrors.emailId=""):(formValid.emailId=false,fieldValidationErrors.emailId="Please enter valid email")}
                    }else{
                        fieldValidationErrors.password="field required"
                    }
                    break;
                
            case "emailId":
                if(value){
                    var exp= new RegExp(/^[A-z0-9_]+@[A-z]+\.[A-z]{2,3}$/)
                  if(exp.test(value)){
                    formValid.emailId=true
                    fieldValidationErrors.emailId=""
                  }else{
                    formValid.emailId=false
                    fieldValidationErrors.emailId="Enter valid email"
                  }
                    // {exp.test(value)?(formValid.emailId=true,fieldValidationErrors.emailId=""):(formValid.emailId=false,fieldValidationErrors.emailId="Please enter valid email")}
                    }else{
                        fieldValidationErrors.emailId="field required"
                    }
                    break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password && formValid.name && formValid.emailId;
        this.setState({
            registerformErrorMessage: fieldValidationErrors,
            registerformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        return (
            <React.Fragment>
        {!this.state.registeredStatus? 
            <section id="registerPage" className="registerSection"> 
                <div className="row">
                    <div className="col-md-4 offset-4 ">
                        <div  className="card bg-light">
                            <div className="card-body text-left">
                                <h1>Join Us</h1>
                                <form className="form" onSubmit={this.handleSubmit}> {/* [formGroup]="registerForm" (ngSubmit)="register()" */}
                                <div className="form-group">
                                        <label htmlFor="uname">Name<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.registerform.name}
                                            onChange={this.handleChange}
                                            id="uname"
                                            name="name"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.name ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.name}
                                    </span>)
                                        : null}
                                    <div className="form-group">
                                        <label htmlFor="uemail">Email Id<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.registerform.emailId}
                                            onChange={this.handleChange}
                                            id="uemail"
                                            name="emailId"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.emailId ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.emailId}
                                    </span>)
                                        : null}
                                    <div className="form-group">
                                        <label htmlFor="uContactNo">Contact Number<span className="text-danger">*</span></label>
                                        <input
                                            type="number" pattern="[0-9]"
                                            value={this.state.registerform.contactNo}
                                            onChange={this.handleChange}
                                            id="uContactNo"
                                            name="contactNo"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.contactNo ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.contactNo}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.registerform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            name="password"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerformErrorMessage.password ? (<span className="text-danger">
                                        {this.state.registerformErrorMessage.password}
                                    </span>)
                                        : null}<br />
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />

                                    <button
                                        type="submit"
                                        disabled={!this.state.registerformValid.buttonActive}
                                        className="btn btn-info btn-block"
                                        name="submit1"
                                    >
                                        Register
                                    </button>
                                    <br/>
                          <span className="text-danger" name="errorMessage">{this.state.errorMessage}</span>
                                </form>
                                {this.state.spinnerStatus ?  <Sidebar visible={true} style={{backgroundColor : "rgba(0,0,0,0.3)"}}  fullScreen={true} baseZIndex={1000000}>
                          <div className="text-center" style={{marginTop : "250px"}}>
                          <ProgressSpinner />
                          </div>
                          </Sidebar>:null}
                                <br />
                                {/* <!--can be a button or a link based on need --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            :
          <div className="container-fluid row" style={{marginTop : "75px",position : "relative"}}>
              <div className="col-md-4 offset-4">
              <p className="text-success" name="successMessage">{this.state.successMessage}</p>
              <Link to="/login"><span onClick={this.handleRegistration} className="btn btn-link"><h3>Click here to login</h3></span></Link>
              </div>
          </div>}
        <br/>

      </React.Fragment>
    );
  }
}

export default Register;
