const session = require("express-session");

const config = require("../config/config.json");
const User = require("../models/User")

const sessionMiddleware = session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        sameSite: "lax",
        secure: false,
        httpOnly: true
    }
});

const isAuthentificated = async (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
};

const isAdmin = async (req, res, next) => {
    if (!User.isAdmin({pseudo: req.session.user.pseudo})) {
        return res.status(401).json({message: "Unauthorized !"});
    }
    next();
}

module.exports = { isAuthentificated, isAdmin, sessionMiddleware };