var express = require('express');
var router = express.Router();
const { authenticateToken, shouldBeAdmin } = require('../utils/authUtils');
const topicModel = require('../models/topic');
/* GET home page. */
router.get('/', function(req, res) {
  return res.end();
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

module.exports = router;
