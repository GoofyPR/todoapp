const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./routes/Route.js");

const app = express();
app.use(bodyparser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGODB_URI;

mongoose.connect(URL)
.then(()=>{
    console.log("db connected...");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })
})
.catch((err)=> console.error("Error while connecting to mongodb..",err));

app.use("/api",route);

