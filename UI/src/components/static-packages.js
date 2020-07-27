import React, { Component } from 'react';
import {Sidebar} from 'primereact/sidebar';
//import {Button} from 'primereact/button';
// import Tabview from './tabview';

const dummyData = [
    {
        "destinationId" : "D1001",
        "continent":"Europe",
        "imageUrl":"../assets/greece.jpg",
        "name" : "A Week in Greece: Athens, Mykonos & Santorini",
        "details" : {
            "about" : "Watch the setting sun from the hilltops of Greece’s most famous islands.Experience ancient history and open-air museums in the capital of Athens. Then, the quintessential, beautiful Greek islands you’ve been dreaming of come to life on the isles of Mykonos and Santorini.",
            "itinerary" : {
                "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Athens.",
                        "restDaysSightSeeing":[
                                                "Santorini",
                                                "Acropolis", 
                                                "Parthenon", 
                                                "Temple of Apollo", 
                                                "Ruins of Olympia", 
                                                "Ancient Theater of Epidaurus"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "7 nights in handpicked hotels", 
                    "7 breakfasts", 
                    "3 dinners with beer or wine", 
                    "3 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Greece",
                    "Athens",
                    "Mykonos",
                    "Santorini",
                    "Acropolis", 
                    "Parthenon", 
                    "Temple of Apollo", 
                    "Ruins of Olympia", 
                    "Ancient Theater of Epidaurus", 
                    "Corinth Canal photo stop"
                ],
                "tourPace" : [ 
                    "On this guided tour, you will walk for about 2 hours daily across uneven terrain, including paved roads and unpaved trails, with some hills and stairs."
                ]
            }
        },
        "noOfNights" : 7.0,
        "flightCharges":500,
        "chargesPerPerson" : 2499.0,
        "discount" : 0.0,
        "availability":30
    }, 
    {
        "destinationId" : "D1002",
        "continent":"Europe",
        "imageUrl":"../assets/romantic.jpg",
        "name" : "Romantic Europe: Paris, Venice & Vienna",
        "details" : {
            "about" : "Get swept away by the beauty of Europe’s most romantic cities.Journey through the dazzling imperial capitals of France, Italy, Slovenia, and Austria, soaking up each destination’s unique culture along the way. Sip coffee in charming cafes, spend your days exploring the grand boulevards or admiring sparkling canals, and watch each city’s skyline light up every evening.",
            "itinerary" : {
                 "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Paris.",
                        "restDaysSightSeeing":[
                                                "Vienna",
                                                "Eiffel Tower photo stop", 
                                                "The Grand Canal", 
                                                "St. Mark’s Square", 
                                                "Ljubljana’s Prešeren Square", 
                                                "Graz’s Old Town"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "10 nights in handpicked hotels", 
                    "10 breakfasts", 
                    "4 dinners with beer or wine", 
                    "4 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Paris",
                    "Venice",
                    "Vienna",
                    "Eiffel Tower photo stop", 
                    "The Grand Canal", 
                    "St. Mark’s Square", 
                    "Ljubljana’s Prešeren Square", 
                    "Graz’s Old Town", 
                    "Schönbrunn Palace"
                ],
                "tourPace" : [ 
                    "On this guided tour, you’ll walk for about 2.5 hours daily across mostly flat terrain, including paved roads and cobblestone streets, with some hills and stairs."
                ]
            }
        },
        "noOfNights" : 10.0,
        "flightCharges":500,
        "chargesPerPerson" : 2729.0,
        "discount" : 0.0,
        "availability":30
    },{
        "destinationId" : "D1003",
        "continent":"Europe",
        "name" : "Jewels of Alpine Europe",
        "imageUrl":"/assets/europe.jpg",
        "details" : {
            "about" : "Experience rich culture against a backdrop of soaring Alpine peaks.Journey from Switzerland’s mountain-lined Lake Lucerne to France’s inspiring Lake Annecy. Take in the picturesque Chamonix Valley and stroll along Italy’s Lake Como. Then, cross Liechtenstein and hit the winter wonderland of Innsbruck before heading to Munich, the lively capital of Bavaria.",
            "itinerary" : {
                     "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Zurich.",
                        "restDaysSightSeeing":[
                                                "Chapel Bridge", 
                                                "Lake Annecy boat ride", 
                                                "Chamonix, Mont Blanc", 
                                                "Lake Como", 
                                                "Bernina Express train ride", 
                                                "Liechtenstein"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "11 nights in handpicked hotels", 
                    "11 breakfasts", 
                    "5 dinners with beer or wine", 
                    "8 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Alpine",
                    "Chapel Bridge", 
                    "Lake Annecy boat ride", 
                    "Chamonix, Mont Blanc", 
                    "Lake Como", 
                    "Bernina Express train ride", 
                    "Liechtenstein", 
                    "Nymphenburg Palace", 
                    "The Glockenspiel"
                ],
                "tourPace" : [ 
                    "On this guided tour, you’ll walk for about 1 hour daily across moderately uneven terrain, including paved roads and cobblestone streets, with few hills or stairs."
                ]
            }
        },
        "noOfNights" : 11.0,
        "flightCharges":500,
        "chargesPerPerson" : 2799.0,
        "discount" : 0.0,
        "availability":30
    }, 
    {
        "destinationId" : "D1004",
        "continent":"Europe",
        "name" : "Highlights of Eastern Europe",
        "imageUrl":"/assets/easteurope.jpg",
        "details" : {
            "about" : "Experience Eastern Europe in all its complexity. Imperial palaces, World War II sites, vibrant cafes—you can find it all in Eastern Europe. Journey along the Danube from the two-sided city of Budapest to Vienna, unrivaled for its beauty and majesty. Then, visit the castles and cathedrals of Prague and explore medieval Kraków before ending in modern Warsaw.",
            "itinerary" : {
                "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Budapest.",
                        "restDaysSightSeeing":[
                                                "Hungarian Parliament Building", 
                                                "Szentendre", 
                                                "Schönbrunn Palace", 
                                                "Ringstrasse, Mikulov", 
                                                "Prague Castle", 
                                                "Wawel Cathedral"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "13 nights in handpicked hotels", 
                    "13 breakfasts", 
                    "5 dinners with beer or wine", 
                    "6 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Matthias Church", 
                    "Hungarian Parliament Building", 
                    "Szentendre", 
                    "Schönbrunn Palace", 
                    "Ringstrasse, Mikulov", 
                    "Prague Castle", 
                    "Wawel Cathedral", 
                    "Palace of Culture and Science"
                ],
                "tourPace" : [ 
                    "On this guided tour, you'll walk for about 2.5 hours daily across mostly flat terrain, including paved roads and cobblestone streets, with few hills or stairs."
                ]
            }
        },
        "noOfNights" : 13.0,
        "flightCharges":500,
        "chargesPerPerson" : 2699.0,
        "discount" : 0.0,
        "availability":30
    }, 
    {
        "destinationId" : "D1005",
        "continent":"Europe",
        "name" : "London, Paris & Rome",
        "imageUrl":"/assets/rome.jpg",
        "details" : {
            "about" : "Delve deep into the history and culture of three inspiring, influential cities. Perhaps no cities have influenced the world more over the last 2,000 years than London, Paris, and Rome. On this guided tour, iconic sights like Big Ben, the Eiffel Tower, and the Colosseum are just the beginning of what you'll see. Take it all in as you embark on this sweeping trip through England, France, and Italy.",
            "itinerary" : {
                "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to London.",
                        "restDaysSightSeeing":[
                                                "Trafalgar Square", 
                                                "Buckingham Palace", 
                                                "Eurostar train ride", 
                                                "Place de la Concorde", 
                                                "Eiffel Tower photo stop", 
                                                "The Colosseum"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "9 nights in handpicked hotels", 
                    "9 breakfasts", 
                    "3 dinners with beer or wine", 
                    "3 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "London",
                    "Paris",
                    "Rome",
                    "Trafalgar Square", 
                    "Buckingham Palace", 
                    "Eurostar train ride", 
                    "Place de la Concorde", 
                    "Eiffel Tower photo stop", 
                    "The Colosseum", 
                    "The Roman Forum"
                ],
                "tourPace" : [ 
                    "On this guided tour, you’ll walk for about 1 hour daily across mostly flat terrain, including paved roads and cobblestone streets, with few hills or stairs."
                ]
            }
        },
        "noOfNights" : 13.0,
        "flightCharges":500,
        "chargesPerPerson" : 2699.0,
        "discount" : 0.0,
        "availability":30
    },
    {
        "destinationId" : "D1006",
        "continent":"Australia",
        "name" : "Grand Tour of Australia",
        "imageUrl":"/assets/aus1.jpg",
        "details" : {
            "about" : "An island, a country, and a continent all in one.Experience the allure of the Land Down Under when you snorkel above the Great Barrier Reef, gaze at Uluru, and explore the Sydney Opera House. From multicultural Melbourne to the vast Outback, Australia is full of surprises for you to discover.",
            "itinerary" : {
                "dayWiseDetails":{
                        "firstDay":"Cross the International Date Line in flight and lose a day.",
                        "restDaysSightSeeing":[
                                                "Carlton Gardens", 
                                                "Alice Springs", 
                                                "Royal Flying Doctor Service", 
                                                "Uluru", 
                                                "Great Barrier Reef", 
                                                "Bondi Beach"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "11 nights in handpicked hotels", 
                    "11 breakfasts", 
                    "1 lunch", 
                    "2 dinners with beer or wine", 
                    "6 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Australia",
                    "Sydney",
                    "Melbourne",
                    "Carlton Gardens", 
                    "Alice Springs", 
                    "Royal Flying Doctor Service", 
                    "Uluru", 
                    "Great Barrier Reef", 
                    "Bondi Beach", 
                    "Sydney Opera House"
                ],
                "tourPace" : [ 
                    "On this guided tour, you’ll walk for about 1 hour daily across mostly flat terrain, including paved roads and gravel paths, with few hills."
                ]
            }
        },
        "noOfNights" : 14.0,
        "flightCharges":500,
        "chargesPerPerson" : 4549.0,
        "discount" : 0.0,
        "availability":30
    }, 
    {
        "destinationId" : "D1007",
        "continent":"Australia",
        "name" : "Australia & New Zealand",
        "imageUrl":"/assets/aus2.jpg",
        "details" : {
            "about" : "Australia and New Zealand—a world away. From Australia's Great Barrier Reef and the rugged Outback to New Zealand's sheep-dotted plains and cliff-lined fjords, the South Pacific features a lineup of dramatic landscapes. In-between outdoor adventures, you’ll discover sophisticated, multicultural cities and an irresistible, carpe diem spirit on this tour.",
            "itinerary" : {
                "dayWiseDetails":{
                        "firstDay":"Cross the International Date Line in flight and lose a day.",
                        "restDaysSightSeeing":[
                                                "Melbourne", 
                                                "Uluru", 
                                                "Great Barrier Reef", 
                                                "Sydney Opera House", 
                                                "Glowworm Caves", 
                                                "Bob’s Peak", 
                                                "Milford Sound", 
                                                "Kiwi Wildlife Park"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "19 nights in handpicked hotels", 
                    "19 breakfasts", 
                    "1 lunch", 
                    "6 dinners with beer or wine", 
                    "13 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach", 
                    "Flights from Melbourne to Alice Springs, Uluru Region to Great Barrier Reef Region, Great Barrier Reef Region to Sydney, Sydney to Fiordland National Park Region, Queenstown to Rotorua"
                ],
                "tourHighlights" : [ 
                    "Sydney",
                    "Australia",
                    "New Zealand",
                    "Melbourne", 
                    "Uluru", 
                    "Great Barrier Reef", 
                    "Sydney Opera House", 
                    "Glowworm Caves", 
                    "Bob’s Peak", 
                    "Milford Sound", 
                    "Kiwi Wildlife Park", 
                    "Kiwi home-hosted dinner", 
                    "Auckland’s Sky Tower"
                ],
                "tourPace" : [ 
                    "On this guided tour, you’ll walk for about 1 hour daily across mostly flat terrain, including paved roads and gravel paths, with few hills."
                ]
            }
        },
        "noOfNights" : 22.0,
        "flightCharges":500,
        "chargesPerPerson" : 6399.0,
        "discount" : 0.0,
        "availability":30
    }]



class StaticPackage extends Component {
    constructor() {
        super();
        this.state = {
          
            visibleRight:false,
            activeIndex:123,
            DestinationObj:""
           
    }}

    getItinerary = (aPackage) => {
        
        this.setState({visibleRight:true,
        activeIndex:0,DestinationObj:aPackage})

    };
    openBooking = (aPackage) => {
        this.setState({visibleRight:true,
            activeIndex:2})
    
      
    };

    render() {
        const singlePackage = dummyData[6];
        return (
            // <div>
            //    { this.state.visibleRight?<Sidebar visible={this.state.visibleRight}  position="right" className="p-sidebar-lg" baseZIndex={1000000} onHide={(e) => this.setState({visibleRight: false})}>
            //     <Tabview ActiveIndex={this.state.activeIndex} DestinationObj={this.state.DestinationObj}/>
            //         </Sidebar>:null}
                    
                    

        <div className="card bg-light text-dark package-card" key={singlePackage.destinationId}>
            <div className="card-body row">
                <div className="col-md-4">
                    <img className="package-image" alt="destination comes here" src={require("../assets/greece.jpg")} />
                    <img className="package-image" alt="destination comes here" src={require("../assets/greece.jpg")} />
                </div>
                <div className="col-md-5">
                    <div className="featured-text text-center text-lg-left">
                        <h4>{singlePackage.name}</h4>
                        <div className="badge badge-info">{singlePackage.noOfNights}<em> Nights</em></div>
                        {singlePackage.discount ? <div className="discount text-danger">{singlePackage.discount}% Instant Discount</div> : null}
                        <p className="text-dark mb-0">{singlePackage.details.about}</p>
                    </div>
                    <br />

                </div>
                <div className="col-md-3">
                    <h4>Prices Starting From:</h4>
                    <div className="text-center text-success"><h6>{singlePackage.chargesPerPerson}</h6></div><br /><br />
                    <div><button className="btn btn-primary book" onClick={() => this.getItinerary(singlePackage)}>View Details</button></div><br />
                    {this.state.visibleRight}
                    <div><button className="btn btn-primary book" onClick={() => this.openBooking(singlePackage)}>Book </button>  </div>
                </div>
            </div>
        </div>
        // </div>
         )
    }

}

export default StaticPackage;
