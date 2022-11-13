const mongoose = require("mongoose");

const carBooking = mongoose.Schema({
    userId : {
        type : Number
    },
    userName : {
        type : String
    },
    carImage : {
        type : String
    },
    carTitle : {
        type : String
    },
    carDescription : {
        type : String
    },
    location : {
        type : String
    },
    pricePerHr : {
        type : Number
    },
    catName : {
        type : String
    },
    timeSlot : {
        type : String
    },
    dateOfBooking : {
        type : String
    },
    totalCost : {
        type : Number
    }
})

module.exports = mongoose.model("carBooking", carBooking);

