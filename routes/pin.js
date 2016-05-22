var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('mypins')
});

router.get('/delete/:id', isLoggedIn, function (req, res) {
	var PinId = req.params.id;
	Pin.findById(PinId, function (err, Pin) {
		if (err){
			throw err;
		}
		if (Pin.userId != req.user.id){
			return res.redirect('/pin/view/' + PinId);
		}
		Pin.remove(function (err, Pin) {
			if (err){
				throw err;
			}
			res.redirect('/pin/mypins');
		})
	})
});


router.get('/mypins', isLoggedIn, function (req, res) {
	console.log(req.user);
	var userId = req.user.id;
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
		res.render('pins.ejs', {title: "My Pins", Pins: Pins, user: req.user, PinsUserName: req.user.name});
	})
});

router.get('/delete/:pinId', isLoggedIn, function (req, res, next) {
	var pinId = req.params.pinId;
	Pin.findById(pinId, function (err, pin) {
		if (err){
			console.log(err);
			return res.redirect('/pin/mypins');
		}
		if (!pin || (pin.userId !== req.user.id)){
			return res.redirect('/pin/mypins')
		}
		Pin.remove(function (err) {
			if (err){
				console.log(err);
			}
			return res.redirect('/pin/mypins');
		})
	})
})

router.get('/newpin', isLoggedIn, function (req, res) {
	res.render('newPin', {title: 'New Pin', user: req.user});
});

router.post('/newpin', isLoggedIn, function (req, res) {
	var newPin = new Pin();
	newPin.userId = req.user.id;
	newPin.userName = req.user.name;
	newPin.title = req.body.title;
	newPin.url = req.body.url;
	newPin.save(function (err, Pin) {
		res.redirect('/pin/newpin');
	})
});



function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	return res.redirect("/");
}

module.exports = router;
