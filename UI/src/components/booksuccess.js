import React,{Component} from "react";
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Redirect} from "react-router-dom";

class ConfirmMessage extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoad:true,
            redirect:false,
            loadBookings:false
        }
    }

    componentDidMount(){
        // this.changeDate();
        setTimeout(()=>this.setState({isLoad : false}),1000)
        console.log(this.props.data )
    }
    // changeDate = ()=>{
    //     var format={year:'numeric',month:'long',day:'numeric'};
    //     this.props.data.checkInDate = this.props.data.checkInDate.toLocaleString('en',format);
    //     this.props.data.checkOutDate = this.props.data.checkOutDate.toLocaleString('en',format)

    // }
    handleClick = () => {
        this.setState({ loadBookings: true })
    }
    
    
    render(){
        if (this.state.loadBookings === true) return <Redirect to={'/viewBookings'} />
        const footer = (
            <span>
                <Button label="View Booking" tooltip="View your planned trips here" icon="p-button-info" onClick={this.handleClick}/>
            </span>
        );
        var format={year:'numeric',month:'long',day:'numeric'};


        return(
            <div style={{marginBottom:100,marginTop:120}} >
                <div className="row" >
                    <div className="col-md-10 offset-md-1" >
                {this.state.isLoad ?  <ProgressSpinner/>:
                    <div>{this.props.errorMessage ?
                    <Card title="Something went wrong!!!" style={{width: '100%',marginBottom: 100}} className="ui-card-shadow">
                    {this.props.data }
                        <h3 className="text-danger" >{this.props.errorMessage}</h3>
                    </Card>
                        :
                    <Card title="Booking Confirmed!!" style={{width: '100%'}} footer={footer} className="ui-card-shadow">
                    <div> <h4>Congratulations! Trip planned to:{this.props.data.destinationName}</h4>
                            <h5>Trip starts on: {new Date(this.props.data.checkInDate).toLocaleString('en',format)}</h5>
                            <h5>Trip ends on: {new Date(this.props.data.checkOutDate).toLocaleString('en',format)}</h5>
                    </div>
                    </Card>
                    }</div>
                }

                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmMessage;