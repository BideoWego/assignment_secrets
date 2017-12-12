const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { createSignedSessionId, loggedOutOnly } = require("../services/session");


// ----------------------------------------
// Show
// ----------------------------------------
router.get('/user', async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'permissions requests secrets',
        populate: {
          path: 'user secret requests permissions'
        }
      });
    debugger;
    res.render('users/show', { user });
  } catch (e) {
    next(e);
  }
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post("/users", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Here we create a new user.
    // This virtual password field will automatically hash our password, as we
    // previously discussed.
    const user = new User({ email, password });
    await user.save();

    // Once the user is created, we create the sessionId and redirect, just as
    // we did in the login POST route
    const sessionId = createSignedSessionId(email);
    res.cookie("sessionId", sessionId);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});


module.exports = router;
