var connection = require( "../Connections" );


var bookingDAL = {}

//implement Dal
//Generating BookingId
bookingDAL.generateId = () => {
    return connection.getConnection().then( ( db ) => {
        var myCollection = db.collection( 'Bookings' );
        return myCollection.distinct( "bookingId" ).then( ( ids ) => {
            var idArr = ids.map( ( id )=>{
                return id.substr( 1, );
            } )
            let bId = Math.max( ...idArr );
            return'B'+( bId + 1 );
        } )
    } )
}

//This will fetch Destination details from DB
bookingDAL.getDetails = ( destId ) => {
    return connection.getConnection().then( function ( db ){
        var coll = db.collection( 'Destinations' );
        return coll.findOne( {"destinationId": destId} ).then( ( result )=>{
            if( result ){
               return result;
            } else{
               return null;
            }
       } )        
     } )
 }

 bookingDAL.getHotDealdetails = ( destId )=>{
    return connection.getConnection().then( function ( db ){
        var coll = db.collection( 'Hotdeals' );
        return coll.findOne( {"destinationId": destId} ).then( ( result )=>{
            if( result ){
               return result;
            } else{
               return null;
            }
       } )        
     } )
 }

//Booking
 bookingDAL.book = ( booking ) => {
    return connection.getConnection().then( ( db )=>{
        return bookingDAL.generateId().then( ( bId )=>{
            var coll = db.collection( 'Bookings' );
            var destcoll = db.collection( 'Destinations' );
            var usersCollection = db.collection( 'Users' )
            booking.bookingId = bId;
            return coll.insertOne( booking ).then( ( insertion )=>{
                if( insertion.insertedCount > 0 ){
                     return destcoll.updateOne( {"destinationId": booking.destId},
                     {$inc: {"availability": -booking.noOfPersons}} ).then( ( isUpdate )=>{
                         if( isUpdate.modifiedCount > 0 ){
                            return usersCollection.updateOne( {userId: booking.userId},{$push: {"bookings": booking.bookingId}} ).then( ( userUpdated )=>{
                                if( userUpdated.modifiedCount>0 ){
                                    return booking;
                                } else{
                                    return null;
                                }
                            } );
                         } else{
                             return null;
                         }
                     } )
                } else{
                    return null;
                }
            } )
        } )
    } )
 }
   
 bookingDAL.bookHotDeals = ( booking ) => {
    return connection.getConnection().then( ( db )=>{
        return bookingDAL.generateId().then( ( bId )=>{
            var coll = db.collection( 'Bookings' );
            var destcoll = db.collection( 'Hotdeals' );
            var usersCollection = db.collection( 'Users' )
            booking.bookingId = bId;
            return coll.insertOne( booking ).then( ( insertion )=>{
                if( insertion.insertedCount > 0 ){
                     return destcoll.updateOne( {"destinationId": booking.destId},
                     {$inc: {"availability": -booking.noOfPersons}} ).then( ( isUpdate )=>{
                         if( isUpdate.modifiedCount > 0 ){
                            return usersCollection.updateOne( {userId: booking.userId},{$push: {"bookings": booking.bookingId}} ).then( ( userUpdated )=>{
                                if( userUpdated.modifiedCount>0 ){
                                    return booking;
                                } else{
                                    return null;
                                }
                            } );
                         } else{
                             return null;
                         }
                     } )
                } else{
                    return null;
                }
            } )
        } )
    } )
 }

 bookingDAL.cancel=( id )=>{
    return connection.getConnection().then( ( db )=>{
         var coll=db.collection( 'Bookings' );
        return coll.findOne( {bookingId: id} ).then( ( successfind )=>{
            if( successfind ){
           var destinationId=successfind.destId;
           var noofperson=successfind.noOfPersons;
           return coll.deleteOne( {bookingId: id} ).then( ( successdelete )=>{
            if( successdelete.deletedCount>0 ){
            var coll1=db.collection( 'Users' );
            return coll1.updateMany( {},{$pull: {bookings: id}} ).then( ( successupdate )=>{
                if( successupdate.modifiedCount>0 ){
                    var coll2=db.collection( 'Destinations' );
                    return coll2.findOne( {destinationId: destinationId} ).then( ( successdest )=>{
                        if( successdest ){
                           return coll2.updateOne( {destinationId: destinationId},{$inc: {availability: noofperson}} ).then( ( successupdate1 )=>{
                                return id;
                            } )
                        }
                        else{
                            var coll3 = db.collection( 'Hotdeals' );
                           return coll3.findOne( {destinationId: destinationId} ).then( ( successdest2 )=>{
                                return coll3.updateOne( {destinationId: destinationId},{$inc: {availability: noofperson}} ).then( ( successupdate2 )=>{
                                    return id;
                                } )

                            } )
                        }
                    } )
                }
            } )    
        }
           } )
        }
        else{
            return null;
        }
        } )
     } )
 }

module.exports = bookingDAL;