module.exports = function (mongoose) {
	var pinSchema = mongoose.Schema({
		userId: String,
		userName: String,
		title: String,
		url: String
	});
	var Pin = mongoose.model("Pin", pinSchema);
	return Pin;
}