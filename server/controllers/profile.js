

const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const Availability = require("../models/availability");
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
  const profile = await User.findById(req.user.id, "profile");

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

// @route GET /profile/sitter
// @desc Get all profile data
// @access Private
exports.getAllSitters = asyncHandler(async (req, res) => {
  console.log(req.query.location)
  const result=[];
  const query={
    isSitter: {
      $eq: true,
    }
  }
  const profiles = await Profile.find({isSitter:true,price:{$gt:0}})   
  if(profiles) 
  {
   profiles.filter((profile)=>{
          if(profile.address.search(req.query.location)>-1)
          {
            result.push(profile);
          }
        })
  res.status(200).json({
    success: {
      profiles: result
    },
  });
}
else {
  res.status(204).json({});
  throw new Error("No Profile found");
}
});