const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { sessionMiddleware } = require("./middleware/session");
const config = require("./config/config.json");

const authRoute = require("./routes/auth");
const leaderboardRoute = require("./routes/leaderboard");
const userRoute = require("./routes/users")

const app = express();
const port = config.port;

app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
    console.log(`Serveur en ligne. PORT : ${port}`)
});