const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		firstname: {
			type: String,
			require: [true, "please provide first name"],
		},
		lastname: {
			type: String,
			require: [true, "please provide last name"],
		},
		username: String,
		city: String,
		contactNumber: Number,
		email: String,
		password: String,
	},
	{ timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
