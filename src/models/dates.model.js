const mongoose = require("mongoose");
const { Schema } = mongoose;

const VentasSchema = new Schema({
  fecha: {
    type: String,
    required: true,
  },
  productos: {
    type: Array,
    default: [],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  versionKey: false,
});

module.exports = mongoose.model("dates", VentasSchema);
