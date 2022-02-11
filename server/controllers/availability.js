const Availability = require( "../models/availability" );
const asyncHandler = require( "express-async-handler" );
const Profile = require( "../models/Profile" );

// @route POST /schedule/
// @desc Create a schedule
// @access Public
exports.createSchedule = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const profileId = profile._id;
  const { name, days } = req.body;
  const schedule = await Availability.findOne( { name, petSitterId: profileId } );
  if ( schedule )
  {
    res.status( 400 );
    throw new Error( "Schedule name already exist" );
  }
  const newSchedule = await Availability.create( {
    petSitterId: id,
    name,
    days,
  } );
  if ( newSchedule )
  {
    if ( !profile.activeSchedule )
    {
      profile.set( { activeSchedule: newSchedule.id } );
      await profile.save();
    }
    res.status( 201 ).json( {
      success: {
        newSchedule
      }
    } );
  }
} );

// @route GET /availability/:scheduleId
// @desc Get schedule
// @access Private
exports.getScheduleId = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const scheduleId = req.params.scheduleId;
  const schedule = await Availability.findOne( { _id: scheduleId } )
  if ( schedule && schedule.petSitterId === profile._id )
  {
    res.status( 200 );
    res.send( schedule );
  } else
  {
    res.status( 404 ).json( {} );
    throw new Error( "No Schedule found" );
  }
} );

// @route GET /availability
// @desc Get schedule
// @access Private
exports.getSchedule = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const profileId = profile._id;
  const schedule = await Availability.find( { petSitterId: profileId } )
  res.status( 200 );
  res.send( schedule );
} );

// @route GET /availability/active
// @desc Get active schedule
// @access Private
exports.getActiveSchedule = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const activeSchedule = await Availability.findOne( { _id: profile.activeSchedule } );
  if ( active )
  {
    res.status( 200 );
    res.send( activeSchedule );
  }
} );

// @route PUT /availability/:scheduleId/activate 
// @desc Set active schedule
// @access Private
exports.setActiveSchedule = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const scheduleId = req.params.scheduleId;
  profile.set( { activeSchedule: scheduleId } );
  const updatedProfile = await profile.save();
  res.status( 200 ).json( {
    success: {
      profile: updatedProfile,
    },
  } );
} );