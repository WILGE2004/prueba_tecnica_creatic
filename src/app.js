const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const authApi = require("./routes/auth.routes");
const api = require("./routes/apis.routes");

//settings
app.set("port", process.env.PORT || 8080);
app.set("secret_key", process.env.SECRET_KEY);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes

app.use(authApi);
app.use(api);

module.exports = app;
