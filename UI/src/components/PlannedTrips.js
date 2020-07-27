import React, { Component } from "react";
import axios from "axios";
import { backendUrlBooking, backendUrlUser } from '../BackendURL';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

class PlannedTrips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: "",
            errorMessage: "",
            claimBooking: "",
            logged_userId: sessionStorage.getItem('userId'),
            dialog_visible: false
        };
    }
    onClick = (booking) => {
        this.setState({ dialog_visible: true, claimBooking: booking })
    }
    onHide = (event) => {
        this.setState({ dialog_visible: false });
    }
    fetchBookingbyID = () => {
        axios.get(backendUrlUser + '/getBookings/' + this.state.logged_userId).then((successresponse) => {
            if(successresponse.data.length!==0){
                this.setState({ bookingData: successresponse.data });
                this.setState({ errorMessage: "" });}
                else{
                    this.setState({
                        errorMessage: "Sorry you have not planned any trips with us yet",
                        bookingData: ""
                    });
                }
        }).catch((error) => {
            this.setState({
                errorMessage: "Sorry you have not planned any trips with us yet",
                bookingData: ""
            });
        })
    };
    cancelBooking = () => {
        axios.delete(backendUrlBooking + '/cancelBooking/' + this.state.claimBooking.bookingId).then((successresponse) => {
            this.setState({ bookingData: "" })
            this.setState({ errorMessage: "" });
            this.onHide();
            this.fetchBookingbyID();
        }).catch((error) => {
            this.setState({
                bookingData: ""
            });
        })
    };
    componentDidMount = () => {
        this.fetchBookingbyID();
    }
    render() {
        var bookings = this.state.bookingData;
        const foot = (
            <div>
                <Button label="BACK" onClick={this.onHide} />
                <Button label="CONFIRM CANCELATION" onClick={this.cancelBooking} className="p-button-secondary" />
            </div>
        );
        const footer = (
            <div className="footer"> </div>
        );
        const header = (booking) => {
            return (<div className='cardheader'>Booking Id : {booking.bookingId}</div>)
        }
        const checkinDate = (book) => {
            var checkin = new Date(book.checkInDate).toLocaleDateString();
            var checkindate = checkin.split('/');
            var montth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var datee = montth[checkindate[0] - 1] + " " + checkindate[1] + "," + checkindate[2];
            return (datee);
        };
        const checkoutDate = (book) => {
            var checkout = new Date(book.checkOutDate).toLocaleDateString();
            var checkoutdate = checkout.split('/');
            var montth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var datee = montth[checkoutdate[0] - 1] + " " + checkoutdate[1] + "," + checkoutdate[2];
            return (datee);
        };
        return (
            <React.Fragment>
                <div>
                    {this.state.claimBooking ? <Dialog header="Confirm Cancellation" visible={this.state.dialog_visible} style={{ width: '40vw', textAlign: 'left' }} footer={foot} onHide={this.onHide}>
                        <div>
                            <div className='text-danger'>Are you sure you want to cancel trip to {this.state.claimBooking.destinationName.split(":").length === 2 ? this.state.claimBooking.destinationName.split(":")[1]: this.state.claimBooking.destinationName.split(":")[0]}</div>
                            <div>Trip start Date : {checkinDate(this.state.claimBooking)}</div>
                            <div>Trips Ends on : {checkoutDate(this.state.claimBooking)}</div>
                            <div>Refund Amount : ${this.state.claimBooking.totalCharges}</div>
                        </div>
                    </Dialog> : null}
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 bookingTable">
                            {this.state.logged_userId ?
                                this.state.errorMessage ? 
                                <div style={{marginTop:100 , marginBottom:180}}>
                                    <h2>Sorry you have not planned any trips with us!</h2>
                                    <form action='/'>
                                        <button type="submit" className="btn btn-success">Click Here TO Start Booking</button>
                                    </form>
                                    </div> :
                                <div>
                                    {bookings ?
                                        (bookings.map((booking, index) => {
                                            let dname = booking.destinationName.split(":");
                                            return (
                                            <div key={index}><br></br>
                                                <Card title={dname.length === 1 ? dname[0]: dname[1]} style={{ width: '600px' }} className="ui-card-shadow " footer={footer} header={header(booking)}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div>Trips starts on : {checkinDate(booking)}</div>
                                                            <div>Trips Ends on : {checkoutDate(booking)}</div>
                                                            <div>Traveller : {booking.noOfPersons}</div>
                                                        </div>
                                                        <div className="col-md-5 offset-md-1">
                                                            <div>Fare Details</div>
                                                            <div>${booking.totalCharges}</div>
                                                            <div><button className="buttonTransparent" onClick={() => { this.onClick(booking) }}>Claim Refund</button></div>
                                                        </div>
                                                    </div>
                                                </Card><br></br></div>

                                        )})) : <div>
                                        {this.state.errorMessage?
                                         <div>
                                             {this.state.errorMessage}
                                             <Link className="btn-success rounded" to="/home">CLICK HERE TO START BOOKING</Link>
                                         </div>:<div>{this.state.errorMessage?this.state.errorMessage:<ProgressSpinner/>}</div>}
                                        </div>
                                    }
                                </div> : <div><br></br><h2 className="text-info"> To view your trips click here to <Link to='/login' className="button1">login</Link></h2></div>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default PlannedTrips;