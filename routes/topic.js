var express = require('express');
var router = express.Router();
const { authenticateToken, shouldBeAdmin } = require('../utils/authUtils');
const topicModel = require('../models/topic');
const articleModel = require('../models/article');
const topic = require('../models/topic');
/* GET home page. */
router.get('/', async function(req, res) {
  try {
    let topics = await topicModel.find();
    return res.status(200).json(topics);
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

router.get('/:topicId', async function(req, res) {
  try {
    let topicId = req.params.topicId;
    let topic = await topicModel.findById(topicId);
    return res.status(200).json(topic);
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

router.post('/', authenticateToken, shouldBeAdmin, async function(req, res) {
  try {
    let { name, imageBase64 } = req.body;
    if (!name || !imageBase64) return res.status(400).json({error: 'Invalid params!'});
    let createdTopic = await topicModel.create({name, imageBase64});
    return res.status(200).json(createdTopic);
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }

});

router.post('/:topicName/article', authenticateToken, shouldBeAdmin, async (req, res) => {
  try {
    let { title, imageBase64, content, isFeatured = false } = req.body;
    let topicName = req.params.topicName;
    if (!title || !imageBase64 || !content) return res.status(400).json({error: 'Invalid params!'});
    let topic = await topicModel.findOne({name: topicName});
    if (!topic) return res.status(403).json({error: 'This topic does not exist'});
    let article = await articleModel.create({title, imageBase64, content, isFeatured});
    if (!article) throw 'Article not created';
    topic.article.push(article._id);
    topic = await topic.save();
    if (topic && article) return res.status(200).json(article);
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

module.exports = router;
