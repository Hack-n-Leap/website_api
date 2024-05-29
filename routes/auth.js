const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { isAuthentificated } = require("../middleware/session");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { pseudo, password } = req.body;

    const user = await User.get({ pseudo });

    if (!user) {
        res.status(404).json({message: "User not found !"});
    } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({message: "Invalid password !"});
        }
    
        req.session.user = { pseudo: pseudo }
    
        res.json({message: "Authentificated !"});
    }
});

router.post("/signup", async (req, res) => {
    const { pseudo, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ pseudo, password: hashedPassword });

    req.session.user = { pseudo: pseudo }
    

    res.json({message: "User created !"});
});

router.get("/isConnnected", async (req, res) => {
    res.json({connected: Boolean(req.session.user)})
})

router.get("/getConnection", async (req, res) => {
    req.session.user = {pseudo: "admin"};
    res.json({message: "Authentificated"});
});

router.post("/logout", isAuthentificated, async (req, res) => {
    req.session.user = null;

    res.json({message: "Disconnected !"});
})

module.exports = router;