var packages = function ( destinationId, continent, imageUrl, name, details, noOfNights, flightCharges, chargesPerPerson, discount, availability ){
    this.destinationId = destinationId;
    this.continent = continent;
    this.imageUrl = imageUrl;
    this.name = name;
    this.details = details;
    this.noOfNights = noOfNights;
    this.flightCharges = flightCharges;
    this.chargesPerPerson = chargesPerPerson;
    this.discount = discount;
    this.availability = availability;
}

packages.toObject = function ( result ){
    return new packages( result.destinationId, result.continent, result.imageUrl, result.name, result.details, result.noOfNights, result.flightCharges, result.chargesPerPerson, result.discount, result.availability );
}

module.exports = packages;