const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userRegister = mongoose.Schema({
    userName : {
        type : String
    },
    email : {
        type : String
    },
    contact : {
        type : Number
    },
    password : {
        type : String
    },
    conPassword : {
        type : String
    }
})

userRegister.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.conPassword = undefined;
    }
    next();
})

module.exports = mongoose.model("userRegister", userRegister);

