const jwt = require("jsonwebtoken");

const requireAuth = (req,res,next)=>{
    const cookies = req.headers.cookies;
    const token = cookies.split("=")[1];

    if(!token){
        res.status(404).json({"Message" : "No token found!"});
    }
    jwt.verify(String(token), "token", (err,data)=>{
        if(err){
            return res.status(400).json({"Message" : "Invalid Token!"});
        }
        req.id = data.id;
    })
    next();
}
module.exports = requireAuth;

