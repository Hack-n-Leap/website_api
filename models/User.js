const mysql = require("mysql2/promise");

const config = require("../config/config.json");

const connection = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

const User = {
    async getAll() {
        const [rows] = await connection.execute("SELECT `pseudo`, `admin` FROM `users` ORDER BY `pseudo`");
        return rows;    
    },
    async get({ pseudo }) {
        const [rows] = await connection.execute("SELECT * FROM `users` WHERE `pseudo` = ?", [pseudo]);
        return rows[0];
    },
    async create({ pseudo, password }) {
        console.log(pseudo, password)
        await connection.execute("INSERT INTO users (pseudo, password) VALUES (?, ?)", [pseudo, password]);
    },
    async delete({ pseudo }) {
        await connection.execute("DELETE FROM users WHERE pseudo = ?", [pseudo]);
    },
    async isAdmin({ pseudo }) {
        const [rows] = await connection.execute("SELECT `admin` FROM `users` WHERE pseudo = ?", [pseudo]);
        return rows[0];
    }
}

module.exports = User;