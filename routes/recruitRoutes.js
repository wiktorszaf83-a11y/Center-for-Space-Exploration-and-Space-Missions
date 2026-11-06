const express = require("express");
const router = express.Router();
const recruitController = require("../controllers/recruitController");

router.get("/recruit", recruitController.recruit);
router.post("/recruit", recruitController.recruit);

module.exports = router;