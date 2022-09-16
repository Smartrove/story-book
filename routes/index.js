const express = require("express");
const router = express.Router();

//  Login/Landing Page
//GET request route
router.get("/", (req, res) => {
  //   console.log("I got here");
  res.render("login", { layout: "login" });
});

//  Dashboard...........
//GET request route  // /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
module.exports = router;
