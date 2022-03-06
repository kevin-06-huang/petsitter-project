const express = require("express");
const router = express.Router();
const { validateDays } = require("../validate");
const { protect } = require("../middleware/auth");
const {
  createSchedule,
  getActiveSchedule,
  getSchedule,
  getScheduleId,
  setActiveSchedule
} = require("../controllers/availability");

router.route("/").post(validateDays, createSchedule);

router.route("/:scheduleId").get(protect, getScheduleId);

router.route("/all").get(protect, getSchedule);

router.route("/active").get(protect,getActiveSchedule);

router.route("/:scheduleId/activate").put(protect,setActiveSchedule);

module.exports = router;
