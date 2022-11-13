const mongoose = require("mongoose");

const carDetails = mongoose.Schema({
    carImage : {
        type : String
    },
    title : {
        type : String
    },
    description : {
        type : String
    },
    location : {
        type : String
    },
    noOfSeat : {
        type : Number
    },
    pricePerHour : {
        type : Number
    },
    engineOut : {
        type:Number
    },
    maxSpeed : {
        type:Number
    },
    catName : {
        type : String
    }
})

module.exports = mongoose.model("carDetails", carDetails);

