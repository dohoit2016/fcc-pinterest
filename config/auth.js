module.exports = {
	'twitter': {
		consumerKey: process.env.TWITTER_CONSUMER_KEY,
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		callbackURL: 'http://fcc-pinterest.herokuapp.com/auth/twitter/callback',
	}
}