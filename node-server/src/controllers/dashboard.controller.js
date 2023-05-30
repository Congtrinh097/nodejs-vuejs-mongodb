// const moment = require('moment');
// const Video = require('../schemas/video.schema');

function summary(req, res) {
  // const newVideo = Video({
  //   title: req.body.title,
  //   description: req.body.description,
  //   type: req.body.type,
  //   url: req.body.url,
  //   views: req.body.views || 0,
  //   likes: req.body.likes || 0,
  //   createdDate: moment(),
  // });
  // return newVideo.save().then(() => {
  //   res.json({
  //     status: true,
  //     message: 'Successful save video!',
  //   });
  // }).catch(err => {
  //   res.json({
  //     status: false,
  //     message: err.message,
  //   });
  // });

  return res.json({
    userCount: 10,
    videoCound: 10
  });
}


module.exports = {
  summary
}