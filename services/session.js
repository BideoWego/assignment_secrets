const SECRET = process.env["secret"] || "puppies";
const md5 = require("md5");
const { User } = require("../models");


const createSignedSessionId = email => {
  return `${ email }:${ generateSignature(email) }`;
};

const generateSignature = email => md5(email + SECRET);

const loginMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return next();
    }

    const [email, signature] = sessionId.split(":");
    const user = await User.findOne({ email });
    if (signature === generateSignature(email)) {
      req.user = user;
      res.locals.currentUser = user;
      return next();
    }

    req.flash('error', "You've tampered with your session!");
    res.redirect('/login');
  } catch (e) {
    next(e);
  }
};


const loggedInOnly = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    req.flash('error', 'Login in first');
    res.redirect("/login");
  }
};

const loggedOutOnly = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    req.flash('error', 'Logout first');
    res.redirect("/");
  }
};


module.exports = {
  createSignedSessionId,
  loginMiddleware,
  loggedOutOnly,
  loggedInOnly
};
