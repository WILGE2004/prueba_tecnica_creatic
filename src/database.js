const mongoose = require("mongoose");

const { URI } = process.env;

mongoose.connect(URI, () => console.log("DB connected"));
