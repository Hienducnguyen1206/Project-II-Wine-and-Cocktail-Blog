import express from "express";

let configviewEngine = (app) => {
app.use(express.static("./src/pulic"));
app.set("view engine", "ejs");
app.set("views","./src/views")
}


module.exports = configviewEngine;