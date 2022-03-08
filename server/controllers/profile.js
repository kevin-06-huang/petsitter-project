const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route PUT /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  profile.set(req.body);
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.params.userId });

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});

exports.searchProfiles = asyncHandler(async (req, res) => {
  if (req.params.searchString) {
    const { searchString } = req.params;
    const profiles = await Profile.find({"address" : {$regex : searchString}});
    res.status(200).json({
      success: {
        profiles: profiles,
      },
    });
  } else {
    const profiles = await Profile.find();
    res.status(200).json({
      success: {
        profiles: profiles,
      },
    });
  };
});

// @route GET /profile/sitter
// @desc Get all profile data
// @access Private
exports.getAllSitters = asyncHandler(async (req, res) => {
  const result = [];
  const profiles = await Profile.find({ isSitter: true, price: { $ne: null } })
  profiles.forEach((profile) => {
    const address = profile.address;
    if (address.toLowerCase().search(req.query.location.toLowerCase()) > -1) {
      result.push(profile);
    }
  })
  res.status(200).json({
    success: {
      profiles: result
    },
  })
});
