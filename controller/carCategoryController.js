const carCategoryModel = require("../models/carCategoryModel");

const creteCategory = async(req,res)=>{
    try {
        const protocol = req.protocol;
        const host = req.hostname;
        const logoName = req.file.filename;
        // const PORT = process.env.PORT;

        const filePath = `${protocol}://${host}/brandLogo/${logoName}`;

        const newCategory = await carCategoryModel({
            brand_name : req.body.brand_name,
            brand_logo : filePath
        })
        const addCategory = await newCategory.save();
        res.status(200).json({addCategory});
    } catch (error) {
        res.status(500).json({"Message" : "Internal Server Error"});
    }
}


// get all category
const allCategories = async(req,res)=>{
    try {
        const categories = await carCategoryModel.find();
        res.status(200).json({categories});
    } catch (error) {
        res.status(500).json({"Message" : "Internal Server Error!"});
    }
}


module.exports = {
    creteCategory,allCategories
}

