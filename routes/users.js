var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/pins/:userId', function (req, res) {
	var userId = req.params.userId;
	User.findById(userId, function (err, user) {
		if (err){
			console.log(err);
			res.redirect('/');
			return;
		}
		if (!user){
			res.redirect('/pin/mypins');
			return;
		}
		Pin.find({
			userId: userId
		}, function (err, Pins) {
			if (err){
				throw err;
			}
			Pins.reverse();
			console.log(Pins);
			// res.json(Pins);
			// return;
			res.render('pins.ejs', {title: user.name, Pins: Pins, user: req.user, PinsUserName: user.name});
		})
	})
	
});

module.exports = router;
