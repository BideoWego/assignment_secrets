const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { createSignedSessionId, loggedOutOnly } = require("../services/session");


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


// ----------------------------------------
// Destroy
// ----------------------------------------
const onDestroy = (req, res) => {
  req.session = null;
  res.cookie("sessionId", "", { expires: new Date() });
  res.redirect("/login");
};
router.get("/logout", onDestroy);
router.delete("/logout", onDestroy);


module.exports = router;
