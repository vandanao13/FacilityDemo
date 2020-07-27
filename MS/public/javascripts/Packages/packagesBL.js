var packageDAL = require( './packagesDAL' )

var packageBL = {}

packageBL.getHotdeals=()=>{
  
    return packageDAL.getHotdeals().then( ( success )=>{
        if( success===null ){
            throw new Error( "Oops we dont't have any hot deals right now. Please check some other time." )
        }
        else{
            return success;
        }
    } )
}

packageBL.getPackage=( keyword )=>{
    
    return packageDAL.getPackage( keyword ).then( ( success )=>{
        if( success.length===0 ){
            throw new Error( "Ooop! The place you want to go is not available in our packages." );
        }
        else{
            return success;
        }
    } )
}



module.exports = packageBL;