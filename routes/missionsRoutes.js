const express = require("express");
const router = express.Router();
const missionsController = require("../controllers/missionsController");

router.get("/missions", missionsController.catalog);

router.get("/missions/:id", missionsController.detail);

module.exports = router;