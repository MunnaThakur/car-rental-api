const route = require("express").Router();
const multer = require("multer");
const path = require("path");
const carCategoryController = require("../controller/carCategoryController");
const carDetailsController = require("../controller/carDetailsController");
const registerController = require("../controller/registerController");
const protection = require("../middlewares/protection");


//Route of register user
route.post("/register", registerController.newRegister);
//Route of login user
route.post("/login",registerController.loginUser);



//Image for logos
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./upload/logos/')
    },
    filename : function(req,file,cb){
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
//filter image by checking image extantion
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
//set limit in image
const upload = multer({storage:storage, limits:{fileSize: 1024*1024*5},fileFilter:fileFilter});


//Route of add category
route.post("/create-category", upload.single("brandLogo"), carCategoryController.creteCategory);
//get category
route.get("/all-categories", carCategoryController.allCategories);





//image for car images
const imagesStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./upload/images/')
    },
    filename : function(req,file,cb){
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
//set limit in image
const imageUpload = multer({storage:imagesStorage, limits:{fileSize: 1024*1024*5},fileFilter:fileFilter});


//Route of add Details
route.post("/add-car",imageUpload.single("carImage"), carDetailsController.carDetails);
//Route of get all cars
route.get("/all-cars", carDetailsController.allCars);
//Route of single car details
route.get("/single-car/:id", carDetailsController.findSingleDetails);
//findbyid get a perticular cars
route.get("/car/:catName", carDetailsController.findByCategory);



module.exports = route;

