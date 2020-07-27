//implement booking bean class
var booking = function ( bookingId ,userId ,destId ,destinationName ,checkInDate,checkOutDate,noOfPersons,totalCharges,timeStamp ) {
    this.bookingId = bookingId;
    this.userId = userId;
    this.destId = destId;
    this.destinationName = destinationName;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.noOfPersons = noOfPersons;
    this.totalCharges = totalCharges;
    this.timeStamp = timeStamp;
}
booking.toObject = function ( result ) {
    return new booking( result.bookingId, result.userId, result.destId, result.destinationName, result.checkInDate, result.checkOutDate, result.noOfPersons, result.totalCharges, result.timeStamp );
}

module.exports = booking;