var bookingDAL = require( './bookingsDAL' );
var bookValidator = require( "./bookValidator" )

var bookingBL = {}


bookingBL.calculateCharges = ( noOfPersons, chargesPerPerson, includeFlight, flightCharges ) => {
    return includeFlight ? noOfPersons * chargesPerPerson + flightCharges : noOfPersons * chargesPerPerson
}

bookingBL.getCheckOutDate = ( checkInDate,noOfNights ) => {
    var checkindate = new Date( checkInDate );
    checkindate.setDate( checkindate.getDate()+noOfNights );
    let checkOutDay = checkindate.getDate();
    let checkOutMonth = checkindate.getMonth()+1;
    let checkOutYear = checkindate.getFullYear();
    if( checkOutMonth<10 ){
        checkOutMonth="0"+checkOutMonth;
    }
    return checkOutYear+"-"+checkOutMonth+"-"+checkOutDay;
}

bookingBL.getDetails = ( destId ) => {
    var destType = bookValidator.checkDestType( destId );
    switch( destType ){
        case"Normal":
            return bookingDAL.getDetails( destId ).then( ( success )=>{
                if( success == null ){
                    throw new Error( "Destination not found" );
                } else{
                    return success;
                }
            } )
            break;
        case"Hotdeals":
            return bookingDAL.getHotDealdetails( destId ).then( ( success )=>{
                if( success == null ){
                    throw new Error( "Destination not found" );
                } else{
                    return success;
                }
            } )
            break;
        default:
            break;
    }
    
}

bookingBL.book = ( booking,includeFlight ) => {
    bookValidator.checkStartDate( booking.checkInDate );
    bookValidator.checkNoOfPersons( booking.noOfPersons );
    var destType = bookValidator.checkDestType( booking.destId );
    switch( destType ){
        case"Normal":
            return bookingDAL.getDetails( booking.destId ).then( ( result )=>{
                if( result.availability === 0 ){
                    throw new Error( "No seats available!" );
                } else if( result.availability < booking.noOfPersons ){
                    throw new Error( "Sorry only "+result.availability+" seats available!" );
                } else{
                    booking.totalCharges =bookingBL.calculateCharges( booking.noOfPersons, result.chargesPerPerson,includeFlight, result.flightCharges );
                    booking.destinationName = result.name;
                    booking.checkOutDate = bookingBL.getCheckOutDate( booking.checkInDate,result.noOfNights );
                    booking.timeStamp = new Date().getTime().toString();
                return bookingDAL.book( booking ).then( ( result )=>{
                    if( result ){
                        return result;
                    }
                } )
            }
        } )
            break;
        case"Hotdeals":
                return bookingDAL.getHotDealdetails( booking.destId ).then( ( result )=>{
                    if( result.availability === 0 ){
                        throw new Error( "No seats available!" );
                    } else if( result.availability < booking.noOfPersons ){
                        throw new Error( "Sorry only "+result.availability+" seats available!" );
                    } else{
                        booking.totalCharges = bookingBL.calculateCharges( booking.noOfPersons, result.chargesPerPerson,includeFlight, result.flightCharges );
                        booking.destinationName = result.name;
                        booking.checkOutDate = bookingBL.getCheckOutDate( booking.checkInDate,result.noOfNights );
                        booking.timeStamp = new Date().getTime().toString();
                    return bookingDAL.bookHotDeals( booking ).then( ( result )=>{
                        if( result ){
                            return result;
                        }
                    } )
                }
            } )
            break;
        default:
            break;
    }
}

bookingBL.cancel=( id )=>{
    return bookingDAL.cancel( id ).then( ( success )=>{
         if( success===null ){
             throw new Error( 'Booking not found for id '+id );
         }
         else return success;
     } )
 }
 


module.exports = bookingBL