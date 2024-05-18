const express = require("express");

const Leaderboard = require("../models/Leaderboard");
const { isAuthentificated } = require("../middleware/session");

const router = express.Router();

router.get("/getAll", async (req, res) => {
    res.json(await Leaderboard.getAll())
});

router.post("/submit", isAuthentificated, async (req, res) => {
    const { time } = req.body; // Format : HH:MM:SS
    const pseudo = req.session.user.pseudo; // Retrieve the pseudo of the user using cookies
    let index = 0;
    let rank = 1;

    const splittedTime = time.split(":");
    const intTime = splittedTime[0] * 60 * 60 + splittedTime[1] * 60 + splittedTime[2] * 60;

    const leaderboard = await Leaderboard.getAll();


    if (leaderboard.length != 0) {
        while (index < leaderboard.length && intTime > leaderboard[index].time) {
            index++;
        }
    
        rank = index + 1;
    
        for (let i = index; i < leaderboard.length; i++) {
            await Leaderboard.updateRank({ rank:leaderboard[i].rank });        
        }
    }

    await Leaderboard.addRun({rank, pseudo, time: intTime,});

    res.json({message: "Success !"});

});

module.exports = router;
