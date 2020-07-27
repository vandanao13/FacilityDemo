var MongoClient = require( 'mongodb' );
var url = "mongodb://localhost:27017/Wanderlust_DB";

var connection={};

connection.getConnection = function (){
    return MongoClient.connect( url,{useNewUrlParser: true} ).then( function ( database ){
        return database.db();
    } )
}
module.exports=connection;