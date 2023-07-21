const router = require("express").Router();
const ctrlAuth = require("../controllers/auth.ctrl");

router.post("/users", ctrlAuth.signup);

router.get("/users/:id", ctrlAuth.getUser);

router.put("/users/:id", ctrlAuth.updateUser);

module.exports = router;
