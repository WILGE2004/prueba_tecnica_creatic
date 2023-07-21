const router = require("express").Router();

const ctrlSales = require("../controllers/dates.ctrl");

// sales routers

router.get("/appointments", ctrlSales.getDates);

module.exports = router;
