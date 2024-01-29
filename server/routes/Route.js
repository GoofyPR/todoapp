const express = require("express");
const { create, getALL, get1, update, delete1 } = require("../controller/Controller.js");


const route = express.Router();

route.post("/create", create);
route.get("/getAll",getALL);
route.get("/get1/:id",get1);
route.put("/update/:id",update);
route.delete("/delete1/:id",delete1);

module.exports = route;