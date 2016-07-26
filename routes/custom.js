var express = require('express');
var router = express.Router();
var facebookPageId = process.env.FACEBOOK_PAGE_ID;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('custom', {facebookPageId: facebookPageId});
});

module.exports = router;
