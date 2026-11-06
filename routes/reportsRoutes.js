const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");

router.get("/reports", reportsController.reportsPage);
router.get("/reports/download-missions", reportsController.downloadReport);
router.get("/reports/download-planets", reportsController.downloadPlanetReport);

module.exports = router;