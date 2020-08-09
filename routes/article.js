var express = require('express');
var router = express.Router();
const { authenticateToken, shouldBeAdmin, isLoggedIn } = require('../utils/authUtils');
const articleModel = require('../models/article');
const topicModel = require('../models/topic');

/* GET home page. */
router.get('/topic/:topicName', isLoggedIn, async function(req, res) {
  try {
    let isLoggedin = req.isLoggedIn;
    let topicName = req.params.topicName;
    let articles;
    let topic = await topicModel.findOne({name: topicName}).populate('article');
    if (!topic) throw 'Could not find';
    if (!isLoggedin) {
      articles = topic.article.filter((article) => {
        return !article.isFeatured
      });
    } else {
      articles = topic.article;
    }
    return res.status(200).json(articles);
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

router.get('/:articleId', isLoggedIn, async function(req, res) {
  try {
    let isLoggedin = req.isLoggedIn;
    let articleId = req.params.articleId;
    let article = await articleModel.findById(articleId);
    if (!article) throw 'Could not find';
    if (!isLoggedin && article.isFeatured) {
      return res.status(403).json({error: 'You are not logged in, this is a featured article'});
    } else {
      return res.status(200).json(articl);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

router.put('/:articleId', authenticateToken, shouldBeAdmin, async function(req, res) {
  try {
    let { title, imageBase64, content, isFeatured = false } = req.body;
    let articleId = req.params.articleId;
    if (!title || !imageBase64 || !content) return res.status(400).json({error: 'Invalid params!'});
    let updateObj = {
      title,
      imageBase64,
      content,
      isFeatured
    }
    let article = await articleModel.findByIdAndUpdate(articleId, updateObj, {new: true});
    if (!article) throw 'Could not update';
    return res.status(200).json(article);
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

module.exports = router;
