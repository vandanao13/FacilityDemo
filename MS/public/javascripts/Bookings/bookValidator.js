var bookValidator = {}

//implement your validators

bookValidator.checkStartDate = ( checkInDate ) =>{
    var today = new Date();
    if( new Date( checkInDate ) < today ){
        throw new Error( 'Cannot start the trip before today! ' );
    }
}

bookValidator.checkDestType = ( destId ) =>{
    let hotdealsreg = /^(HD)[1-9][0-9]{3}$/;
    let reg2 = /^[D][1-9][0-9]{3}$/;
    if( hotdealsreg.test( destId ) ){
       return"Hotdeals";
    } else if( reg2.test( destId ) ){
       return"Normal";
    }
}

bookValidator.checkNoOfPersons = ( noOfPersons ) => {
    if( noOfPersons < 1 || noOfPersons > 5 ){
        throw new Error( 'Number of travellers should be between 1 and 5 ' );
    }
}

module.exports = bookValidator;