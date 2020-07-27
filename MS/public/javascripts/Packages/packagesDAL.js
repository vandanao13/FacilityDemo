var connection = require( '../Connections' );
var Package = require ( './Package' );

var PackagesDAL = {}

PackagesDAL.getHotdeals=()=>{

   return connection.getConnection().then( ( db )=>{
        var coll=db.collection( 'Hotdeals' );
      return  coll.find().toArray().then( ( success )=>{
            if( success ){
               var HotDealsArray=[];
                for( let i=0; i<success.length; i++ ){
                    HotDealsArray.push( Package.toObject( success[i] ) );
                }
                return HotDealsArray;
            }
            else return null;
        } );
    } );
}


PackagesDAL.getPackage=( keyword )=>{
    return connection.getConnection().then( ( db )=>{
        var coll=db.collection( 'Hotdeals' );
      return  coll.find( {$or: [{name: {$regex: keyword,$options: "$i"}},{continent: {$regex: keyword,$options: "$i"}}]} ).toArray().then( ( success )=>{
      var  PackagesArray=[];   
        if( success ){
                
                for( let i=0; i<success.length; i++ ){
                    PackagesArray.push( Package.toObject( success[i] ) );
                }
                var coll1=db.collection( 'Destinations' );
                return coll1.find( {$or: [{name: {$regex: keyword,$options: "$i"}},{continent: {$regex: keyword,$options: "$i"}}]} ).toArray().then( ( success1 )=>{
                    if( success1 ){
                        for( let j=0; j<success1.length; j++ ){
                            PackagesArray.push( Package.toObject( success1[j] ) );
                        }
                    }
                    return PackagesArray;
                } )
            }
        
        } );
    } );
}




module.exports = PackagesDAL;