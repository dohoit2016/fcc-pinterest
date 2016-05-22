var express = require('express');
var router = express.Router();
var Pin = require('mongoose').model('Pin');

/* GET home page. */
router.get('/', function(req, res, next) {
	Pin.find({}, function (err, pins) {
		if (err){
			console.log('err');
		}
		pins.reverse();
		var PinsUserName = (req.user) ? req.user.name : "";
		res.render('pins', {title: "Newest Pins", user: req.user, Pins: pins, PinsUserName: PinsUserName});
	})
});

module.exports = router;
