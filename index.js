require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const allRoute = require("./routes/allRoutes");
const cors = require("cors");

const app = express();

app.use(express.json({limit: "30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
  

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("database is connected...")})
.catch((error)=>{`${error} database is not connected!`});

//Route
app.use("/api", allRoute)

//category image route
app.use("/brandLogo", express.static('upload/logos'))

app.use("/carImage", express.static('upload/images'))

//create server 
const server = process.env.PORT
app.listen(server, ()=>{console.log(`Server is listning on http://localhost:/${server}`)});

