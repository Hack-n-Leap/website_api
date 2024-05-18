const mysql = require("mysql2/promise");

const config = require("../config/config.json");

const connection = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

const Leaderboard = {
    async getAll() {
        const [rows] = await connection.execute("SELECT * FROM `leaderboard` ORDER BY `time`");
        return rows;
    },
    async addRun({ rank, pseudo, time }) {
        await connection.execute("INSERT INTO `leaderboard` (`rank`, `pseudo`, `time`) VALUES (?, ?, ?)", [rank, pseudo, time]);
    },
    async updateRank({ rank }) {
        await connection.execute("UPDATE `leaderboard` SET `rank` = ? WHERE `rank` = ?", [rank + 1, rank])
    }
}

module.exports = Leaderboard;