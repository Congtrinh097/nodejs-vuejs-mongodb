const express = require('express');
const passport = require('passport');

const videosController = require('../controllers/video.controller');

const router = express.Router();

/* 
  @route  /api/vidoe
  @desc   Get all videos
  @access private
*/
router.get('/',
  videosController.getVideoList,
);


/* 
  @route  /api/videos/register
  @desc   Register videos
  @access public
*/
router.post('/add', videosController.add);

/* 
  @route  /api/videos/detail
  @desc   Update profile information
  @access private
*/
router.get('/:id',
  videosController.detail,
);


/* 
  @route  /api/videos/update
  @desc   Update profile information
  @access private
*/
router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  videosController.update,
);


/* 
  @route  /api/videos/delete
  @desc   Delete account
  @access private
*/
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  videosController.deleteVideo,
);

module.exports = router;