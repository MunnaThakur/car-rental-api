const carBookingModel = require("../models/carBookingModel");

const carBooking = async(req,res)=>{
    try {
        const newCarBookin = carBookingModel({
            userId : req.body.userId,
            // image : ,
            carTitle : req.body.carTitle,
            carDescription : req.body.carDescription,
            location : req.body.location,
            pricePerHr : req.body.pricePerHr,
            catName : req.body.catName,
            timeSlot : req.body.timeSlot,
            dateOfBooking : req.body.dateOfBooking,
            totalCost : req.body.totalCost
        })
        const data = await newCarBookin.save();
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({"Message" : "Internal Server Error!"});
    }
}

module.exports = {carBooking};

