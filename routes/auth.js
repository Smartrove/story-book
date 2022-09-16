const express = require("express");
const router = express.Router();
const passport = require("passport");

//  Login/Auth with google
//GET auth/google route
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//  Dashboard...........
//GET request route  // /dashboard
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
module.exports = router;
