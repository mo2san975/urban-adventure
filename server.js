const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require("ejs");
const path = require("path");
const device = require('express-device');
const fs = require("fs");

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(device.capture({ parseUserAgent: true }));
app.use(cookieParser());

device.enableDeviceHelpers(app);
device.enableViewRouting(app);

app.get("/", function(req, res) {
  if(req.cookies["token"]) {
    res.redirect("/")
  } else {
    res.render("index")
  }
});

app.get("/learn", function(req, res) {
  res.render("learn")
});

app.get("/news", function(req, res) {
  res.render("news")
});

app.get("/home", function(req, res) {
  res.render("home")
});


app.use(function(req, res, next) {
  return res.status(404).send("not found"); 
});

app.listen(process.env.PORT || 3000, function() {
  console.log("listening", process.env.PORT || 3000);
});


