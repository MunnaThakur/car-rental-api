const carDetailsModel = require("../models/carDetailsModel");

const carDetails = async(req,res)=>{
    try {
        const protocol = req.protocol;
        const host = req.hostname;
        const imagename = req.file.filename;
        // const PORT = process.env.PORT
        //PORT is only required while we test on local
        const filePath = `${protocol}://${host}/carImage/${imagename}`;

        const newDetails = await carDetailsModel({
            carImage : filePath,
            title : req.body.title,
            description : req.body.description,
            location : req.body.location,
            noOfSeat : req.body.no_of_seat,
            pricePerHour : req.body.price_per_hour,
            engineOut : req.body.engineOut,
            maxSpeed :req.body.maxSpeed,
            catName : req.body.catName
        })
        const data = await newDetails.save();
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({"Message" : "Internal Server Error!"});
    }
}

// get all category
const allCars = async(req,res)=>{
    try {
        const data = await carDetailsModel.find();
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({"Message" : "Internal Server Error!"});
    }
}

//find by categories name
const findByCategory = async(req, res)=>{
    // const cat = req.params
    try {
        const data = await carDetailsModel.find({catName : req.params.catName});
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({"Message":"Internal server error!" });
    }
}


//findById or details 
const findSingleDetails = async(req,res)=>{
    try {
        const data = await carDetailsModel.findById({_id :req.params.id});
        // console.log(req.params);
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({"Message" : "Internal server error!"});
    }
}



module.exports = {
    carDetails,
    allCars,
    findByCategory,
    findSingleDetails
}

