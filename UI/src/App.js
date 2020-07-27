import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Button } from 'primereact/button';

import Login from './components/login';
import Home from './components/home';
import HotDeals from './components/hotDeals';
import SearchPackage from './components/SearchPackage';
import register from './components/register'
import {Dialog} from 'primereact/dialog';
import PlannedTrips from './components/PlannedTrips';
import Book from './components/book'

//import Packages from './components/packages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_userId: sessionStorage.getItem('userId'),
      logged_userName: sessionStorage.getItem('userName'),
      dialog_visible: false,
      logged_out: false
    }
  }

  onClick = (event) => {
    this.setState({ dialog_visible: true })
  }

  onHide = (event) => {
    this.setState({ dialog_visible: false });
  }

  logout = () => {
    this.setState({ dialog_visible: false });
    sessionStorage.clear();
    this.setState({ logged_out: true });
    window.location.reload();
  }

  confirm_logout = () => {
    this.setState({ dialog_visible: true });
    if(this.state.dialog_visible===true){
      this.logout();
    }
  }

  render() {

    const footer = (
      <div>
        <Button label="CONTINUE EXPLORING" icon="pi pi-check" onClick={this.onHide} />
        <Button label="LOGOUT" icon="pi pi-times" onClick={this.confirm_logout} className="p-button-secondary" />
      </div>
    );
    return (
      <div>        
        <div className="content-section implementation dialog-demo">
            <Dialog header="Confirmation" visible={this.state.dialog_visible} style={{width: '25vw'}} footer={footer} onHide={this.onHide} maximizable>
              Are you sure you want to logout?
            </Dialog>
        </div>
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">Start Wandering</Link>
              </div>
              <ul className="navbar-nav ml-auto">
                {this.state.logged_userId ? <li className="nav-item">
                  <Link className="nav-link" to="">Welcome {this.state.logged_userName}</Link>
                </li> : null}
                <li className="nav-item">
                  <Link className="nav-link" to="/packages">Hot Deals </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewBookings">Planned Trips</Link>
                </li>
                {!this.state.logged_userId ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"> Login</Link>
                  </li> : <Link className="nav-link" to="/" onClick={this.onClick}>Logout</Link>}                
              </ul>
            </nav>            
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home/:userId" component={Home}></Route>
              <Route exact path="/register" component={register}></Route>
              <Route exact path="/packages" component={HotDeals}></Route>{/* Only HotDeals*/}
              <Route exact path="/packages/:continent" component={SearchPackage}></Route>{/* Destinations with search*/}
              <Route exact path="/book/:destId" component={Book}></Route>
              <Route exact path="/viewBookings" component={PlannedTrips}></Route>
              {/* <Route path="*" render={() => <Redirect to="/login" />}></Route> */}
            </Switch>
          </div>
        </Router>
        <footer className="bg-black text-center text-white-50">
          Copyright &copy; www.eta.wanderlust.com 2018
    </footer>
      </div>
    );
  }
}

export default App;