const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const registerModel = require("../models/registerModel");


//Register
const newRegister = async (req,res)=>{
    try {
        //Email checking before registering
        const userExists = await registerModel.findOne({email : req.body.email});
        userExists && res.status(400).json({Message : "User already exists"});

        const password = req.body.password;
        const conPassword = req.body.conPassword;
        if(password === conPassword){
            const newUser = registerModel({
                userName : req.body.userName,
                email : req.body.email,
                contact : req.body.contact,
                password : conPassword
            })
            const userAdded = await newUser.save();
            res.status(200).json({userAdded});
        }else{
            res.json({"Message" : "Password does not match!"})
        }
    } catch (error) {
        res.status(500).json({"Message " : "Internal Server error!"});
    }
}


//Login
const loginUser = async(req,res)=>{
    try {
        const user = await registerModel.findOne({email: req.body.email});
        !user && res.status(400).json({"Message" : "Wrong credentials!"});

        const validate = await bcrypt.compare(req.body.password, user.password);
        !validate && res.status(400).json({"Message" : "Password does not match!"});

        //Generating token and set into cookie
        const token = jwt.sign({id : user._id}, "token", {expiresIn: "1hr"});
        res.cookie(String(user._id), token,{
            path : "/",
            expires : new Date(Date.now() + 120000),
            httpOnly : true,
            sameSite : 'lax'
        })

        const {password, ...others} = user._doc;
        return res.status(200).json({others});
    } catch (error) {
        res.status(500).json({"Message" : "Internal server error!"});
    }
}


module.exports = {
    newRegister,
    loginUser
}
