const Sale = require("../models/dates.model");
const sendRes = require("../lib/sendRes");
const ctrlSales = {};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("-");
}

ctrlSales.newSale = async (req, res) => {
  const date = formatDate(new Date());
  const { productos, total } = req.body;
  try {
    const sale = new Sale({
      fecha: date,
      productos,
      total,
    });
    await sale.save();
    sendRes(res, 201, true, "Sale Created");
  } catch (error) {
    sendRes(res, 400, false, "Sale NO Created");
  }
};

ctrlSales.getTodaySales = async (req, res) => {
  const date = formatDate(new Date());
  try {
    const todaySales = await Sale.find({ fecha: date });
    if (todaySales.length === 0) {
      return sendRes(res, 404, false, "No Sales Found");
    }
    res.json(todaySales);
  } catch (error) {
    sendRes(res, 400, false, "Error: No Sales Found");
  }
};

ctrlSales.getDateSales = async (req, res) => {
  const { date } = req.params;

  try {
    const dateSales = await Sale.find({ fecha: date });
    if (dateSales.length === 0) {
      return sendRes(res, 404, false, "No Sales Found");
    }
    res.json(dateSales);
  } catch (error) {
    sendRes(res, 400, false, "Error: No Sales Found");
  }
};

ctrlSales.deleteOneSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findOneAndDelete({ _id: id });
    if (!sale) {
      return sendRes(res, 404, false, "Sale NOT Found");
    }
    sendRes(res, 200, true, "Sale Deleted");
  } catch (error) {
    sendRes(res, 400, false, "Error: Sale NOT Found");
  }
};

ctrlSales.deleteDateSale = async (req, res) => {
  const { date } = req.params;
  try {
    const sale = await Sale.deleteMany({ fecha: date });
    if (sale.deletedCount === 0) {
      return sendRes(res, 404, false, "Sales NOT Deleted: Not found");
    }
    sendRes(res, 200, true, "Sales Deleted Success");
  } catch (error) {
    sendRes(res, 400, false, "Error...");
  }
};

module.exports = ctrlSales;
