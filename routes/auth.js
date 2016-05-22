var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/auth/twitter');
});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {
	successRedirect: "/",
	failureRedirect: "/failure",
	failureFlash: true
}))

router.get('/success', function (req, res) {
	res.end("OK");
});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect("/");
})

module.exports = router;
