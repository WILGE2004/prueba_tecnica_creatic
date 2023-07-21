const router = require("express").Router();

const ctrlSales = require("../controllers/dates.ctrl");

// sales routers

router.post("/new/sale", ctrlSales.newSale);

router.get("/date-sales/:date", ctrlSales.getDateSales);

router.get("/today-sales", ctrlSales.getTodaySales);

router.delete("/one-sale/:id", ctrlSales.deleteOneSale);

router.delete("/date-sale/:date", ctrlSales.deleteDateSale);

// products routers

module.exports = router;
