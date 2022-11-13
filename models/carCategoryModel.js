const mongoose = require("mongoose");

const car_category = mongoose.Schema({
    brand_name : {
        type : String,
        unique : true
    },
    brand_logo : {
        type : String
    }
})

module.exports = mongoose.model("carCategory", car_category);
