var TwitterStrategy = require('passport-twitter').Strategy;

var configAuth = require('./auth');

module.exports = function (passport, User) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		})
	});

	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitter.consumerKey,
		consumerSecret: configAuth.twitter.consumerSecret,
		callbackURL: configAuth.twitter.callbackURL
	}, function (token, tokenSecret, profile, cb) {
		console.log(profile);
		// return;
		User.findOne({
			twitterId: profile.id
		}, function (err, user) {
			if (err){
				return cb(err);
			}
			if (user){
				return cb(null, user);
			}
			var u = new User();
			u.twitterId = profile.id;
			u.name = profile.displayName;
			u.token = token;
			u.save(function (err) {
				if (err){
					throw err;
				}
				return cb(null, u);
			})
		})
	}))
}