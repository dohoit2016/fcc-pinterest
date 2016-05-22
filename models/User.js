module.exports = function (mongoose) {
	var userSchema = mongoose.Schema({
		twitterId: String,
		name: String,
		token: String
	});
	var User = mongoose.model("User", userSchema);
	return User;
}