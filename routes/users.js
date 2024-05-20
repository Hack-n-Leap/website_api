const express = require("express");

const { isAuthentificated } = require("../middleware/session");

const router = express.Router();

router.get("/getActive", isAuthentificated, async (req, res) => {
    res.json({name: req.session.pseudo});
})

module.exports = router;