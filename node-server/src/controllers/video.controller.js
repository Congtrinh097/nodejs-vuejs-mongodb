const moment = require('moment');
const Video = require('../schemas/video.schema');

function add(req, res) {
  const newVideo = Video({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    url: req.body.url,
    views: req.body.views || 0,
    likes: req.body.likes || 0,
    createdDate: moment(),
  });
  return newVideo.save().then(() => {
    res.json({
      status: true,
      message: 'Successful save video!',
    });
  }).catch(err => {
    res.json({
      status: false,
      message: err.message,
    });
  });
}

function update(req, res) {
  const formData = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    url: req.body.url,
    views: req.body.views || 0,
    likes: req.body.likes || 0,
    updatedDate: moment(),
  }

  const opts = {
    new: true,
  }

  Video.findOneAndUpdate({ _id: req.params.id }, { $set: formData }, opts)
    .then(video => {
      res.json(video);
    });
}

function detail(req, res) {
  Video.findById(req.params.id.toString())
    .then(video => {
      if(video) {
        res.json(video);
      } else {
        res.json({
          status: false,
          message: "Not found video",
        });
      }
      
    })
    .catch(err => {
      res.json({
        status: false,
        message: err.message,
      });
    });
}

function deleteVideo(req, res) {
  Video.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        status: 'VIDEO_DELETED',
        message: 'Video deleted!',
      })
    })
    .catch(err => {
      res.json({
        status: false,
        message: err.message,
      });
    });
}

const getVideoList = (req, res) => {
  Video.find({}).then(videos => {
    res.send(videos);  
  });
}

module.exports = {
  add,
  update,
  detail,
  deleteVideo,
  getVideoList
}