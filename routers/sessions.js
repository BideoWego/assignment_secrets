const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { createSignedSessionId, loggedOutOnly } = require("../services/session");


// ----------------------------------------
// New
// ----------------------------------------
router.get(["/login", "/sessions/new"], loggedOutOnly, (req, res) => {
  console.log(req.user);
  res.render("sessions/new");
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post("/sessions", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }

    if (user.validatePassword(password)) {
      const sessionId = createSignedSessionId(email);
      res.cookie("sessionId", sessionId);
      return res.redirect("/");
    }

    req.flash('error', 'Invalid password');
    res.redirect('/login');
  } catch (e) {
    next(e);
  }
});


// ----------------------------------------
// New
// ----------------------------------------
router.get(["/register", "/users/new"], loggedOutOnly, (req, res) => {
  res.render("users/new");
});


module.exports = router;
