const Availability = require("../models/availability");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");

// @route POST /schedule/
// @desc Create a schedule
// @access Public
exports.createSchedule = asyncHandler(async (req, res, next) => {
  const profileId =await Profile.findOne({userId:req.user.id});
  const id=profileId._id;
  const { name, days } = req.body;
  const schedule = await Availability.findOne({ name, petSitterId: profileId._id }); 
  if (schedule) {
    res.status(400);
    throw new Error("Schedule name already exist");
  }
  const newSchedule =  Availability.create({
    petSitterId:id,
    name,
    days,
  });
  if (newSchedule) {
    if (!profileId.activeSchedule) {
      profileId.set({ activeSchedule: newSchedule.id });
      await profileId.save();
    }
    res.status(201).json({
      success: {
        newSchedule
      }
    });
  } else {
    res.status(500);
    throw new Error("Invalid data");
  }
});

// @route GET /availability/:scheduleId
// @desc Get schedule
// @access Private
exports.getScheduleId = asyncHandler(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  const schedule = await Availability.findOne({ _id: scheduleId })
  if (schedule) {
    res.status(200);
    res.send(schedule);
  } else {
    res.status(204).json({});
    throw new Error("No Schedule found");
  }
});

// @route GET /availability/all
// @desc Get schedule
// @access public
exports.getSchedule = asyncHandler(async (req, res, next) => {
  const profileId =await Profile.findOne({userId:req.user.id});
  const id=profileId._id;
  const schedule = await Availability.find({ petSitterId: id })
  if (schedule) {
    res.status(200);
    res.send(schedule);
  } else {
    res.status(204).json({});
    throw new Error("No Schedule found");
  }
});

// @route GET /availability/active
// @desc Get active schedule
// @access Private
exports.getActiveSchedule = asyncHandler(async (req, res, next) => {
  const profileId = req.profile.id;
  const active = await Availability.findOne({ _id: profileId.activeSchedule });
  if (active) {
    res.status(200);
    res.send(schedule);
  } else {
    res.status(404).json({});
    throw new Error("No Schedule found");
  }
});

// @route PUT /availability/:scheduleId/activate 
// @desc Set active schedule
// @access Private
exports.setActiveSchedule = asyncHandler(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  const activeSchedule = await Profile.findOne({ activeSchedule: scheduleId });
  if (!activeSchedule) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  activeSchedule.set(req.body);
  const updatedProfile = await activeSchedule.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});