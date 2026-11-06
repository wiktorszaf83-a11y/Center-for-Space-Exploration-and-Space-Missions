const express = require("express");
const router = express.Router();
const calculatorController = require("../controllers/calculatorController");

router.get("/calculator", calculatorController.calculator);
router.post("/calculator", calculatorController.calculator);

module.exports = router;