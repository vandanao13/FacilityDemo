import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import {backendUrlUser} from '../BackendURL';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginform: {
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                contactNo: "",
                password: ""
            },
            loginformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            userId: ""
        }
    }

    handleClick = () => {
        this.setState({ loadRegister: true })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
    }

    login = () => {
        const { loginform } = this.state;
        axios.post(backendUrlUser+'/login', loginform)
            .then(response => {
                console.log(response);
                let userId = response.data.userId;
                sessionStorage.setItem("contactNo", response.data.contactNo);
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("userName", response.data.name);
                window.location.reload();
                this.setState({ loadHome: true, userId: userId })

            }).catch(errorResponse => {
                // console.log("inError", errorResponse.response.data.message);
                this.setState({errorMessage:errorResponse.response.data.message })
                sessionStorage.clear();
            })
        // console.log(this.state.loginform.contactNo, this.state.loginform.password);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.login();
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
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
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                    // } else if (!(value.match(/[a-zA-z]/) && value.match(/[0-9]/) && value.match([/_/]))) {
                    //     fieldValidationErrors.password = "Please Enter a valid password"
                    //     formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        if (this.state.loadHome === true) return <Redirect to={'/home/' + this.state.userId} />
        if (this.state.loadRegister === true) return <Redirect to={'/register'} />
        return ( 
            <section id="loginPage" className="loginSection"> 
                <div className="row">
                    <div className="col-md-4 offset-4 ">
                        <div  className="card bg-light">
                            <div className="card-body text-left">
                                <h1>Login</h1>
                                <form className="form" onSubmit={this.handleSubmit}> {/* [formGroup]="loginForm" (ngSubmit)="login()" */}
                                    <div className="form-group">
                                        <label htmlFor="uContactNo">Contact Number<span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            value={this.state.loginform.contactNo}
                                            onChange={this.handleChange}
                                            id="uContactNo"
                                            name="contactNo"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.contactNo ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.contactNo}
                                    </span>)
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.loginform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            name="password"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.password ? (<span className="text-danger">
                                        {this.state.loginformErrorMessage.password}
                                    </span>)
                                        : null}<br />
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />

                                    <button

                                    name="submit"
                                        type="submit"
                                        
                                        disabled={!this.state.loginformValid.buttonActive}
                                        className="btn btn-primary"
                                        name="submit"
                                    >
                                        Login
                                    </button>
                                </form>
                                <br />
                                {/* <!--can be a button or a link based on need --> */}
                                <button className="btn btn-primary" onClick={this.handleClick} >Click here to Register</button>
                                {this.state.errorMessage && (<div className={'text-danger'}>{this.state.errorMessage}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;