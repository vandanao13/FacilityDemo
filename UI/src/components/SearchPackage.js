import React, { Component } from 'react';
import {Sidebar} from 'primereact/sidebar';
import Tabview from './tabview';
import {ProgressSpinner} from 'primereact/progressspinner';
import axios from 'axios';
import {backendUrlPackage} from '../BackendURL';
var numeral = require('numeral');



class searchPackage extends Component {
    constructor(props) {
        super(props);
        this.state = { package:"",continent: this.props.match.params.continent,
        visibleRight:false,
        activeIndex:123,
        DestinationObj:"",
        errorMessage:""     
    };
    }

    componentDidMount(props){
        
        this.fetchPackage();
        
    }
    getItinerary = (aPackage) => {
        // alert("The package details are shown as a side-bar from left side");
        this.setState({visibleRight:true,
            activeIndex:0,DestinationObj:aPackage})
    };

    openBooking = (aPackage) => {
        this.setState({visibleRight:true,
            activeIndex:2,DestinationObj:aPackage})
    };

   fetchPackage=()=>{
    
    axios.get(backendUrlPackage+'/destinations/'+this.state.continent).then((success)=>{
            if(success){
            this.setState({package:success.data,errorMessage:""});
            console.log(success.data)
            }
            else{
                this.setState({package:"",errorMessage:"Sorry we dont operate in this area"})
            }
        }).catch((error)=>{
            console.log('here')
            this.setState({package:null,errorMessage:"Details not found"})

        })
    }

    render() {
        var packs=this.state.package
        return (
            <React.Fragment>
                 { this.state.visibleRight?<Sidebar visible={this.state.visibleRight} style={{overflow : "scroll" }} position="right" className="p-sidebar-lg" baseZIndex={1000000} onHide={(e) => this.setState({visibleRight: false})}>
                <Tabview ActiveIndex={this.state.activeIndex} DestinationObj={this.state.DestinationObj}/>
                    </Sidebar>:null}
            {
                packs? packs.length!=0? packs.map((item)=>(
     <div className="card bg-light text-dark package-card" key={item.destinationId}>
    
     <div className="card-body row">
         <div className="col-md-4">
             <img className="package-image" alt="destination comes here" src={require('../'+item.imageUrl.split("/")[1]+'/'+item.imageUrl.split("/")[2])} />
         </div>
         <div className="col-md-5">
             <div className="featured-text text-center text-lg-left">
                 <h4>{item.name}</h4>
                 <div className="badge badge-info">{item.noOfNights}<em> Nights</em></div>
                 {item.discount ? <div className="discount text-danger">{item.discount}% Instant Discount</div> : null}
                 <p className="text-dark mb-0">{item.details.about}</p>
             </div>
             <br />
     
         </div>
         <div className="col-md-3">
             <h4>Prices Starting From:</h4>
             <div className="text-center text-success"><h6>{numeral(item.chargesPerPerson).format('($0,0.00)')}</h6></div><br /><br />
             <div><button className="btn btn-primary book" onClick={() => this.getItinerary(item)}>View Details</button></div><br />
             <div><button className="btn btn-primary book" onClick={() => this.openBooking(item)}>Book </button>  </div>
           
         </div>
     </div>
     </div>
     
             )):<div>{this.state.errorMessage}</div>:
             <ProgressSpinner/> }
            </React.Fragment>
        );
    }
}

export default searchPackage;
