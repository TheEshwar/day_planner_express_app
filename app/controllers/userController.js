const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const validateLogin = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({
			success: false,
			message: "All fields are mendatory",
		});
	}

	let userDetails = await User.findOne({ email });

	if (!userDetails) {
		res.status(400).json({ success: false, message: "User not found" });
	} else {
		let isValidPassword = bcrypt.compareSync(
			password,
			userDetails.password
		);
		if (!isValidPassword) {
			res.status(400).json({
				success: false,
				message: "Incorrect email/password. Please try again...!",
			});
		}
		const token = jwt.sign(
			{ userDetails },
			config.SECRET_KEY,
			{
				expiresIn: "15s",
			},
			(error, token) => {
				if (error)
					res.status(400).json({
						success: false,
						message: "Failed to generate token",
					});
				res.status(200).json({
					userID: userDetails._id,
					username: userDetails.username,
					token,
				});
			}
		);
	}
};

const registerUser = async (req, res) => {
	let { firstname, lastname, username, email, password, contactNumber } =
		req.body;

	if (
		!firstname ||
		!lastname ||
		!username ||
		!password ||
		!contactNumber ||
		!email
	) {
		res.status(201).json({
			success: false,
			message: "Expected fields not provided",
			data: [],
		});
		res.end();
	}

	let userExists = await User.findOne({ email: req.body.email });

	if (userExists) {
		res.status(400).json({
			message: "User already exists",
			success: false,
		});
	}

	let hashedPassword = await bcrypt.hash(password, 10);
	try {
		const userCreation = await User.create({
			...req.body,
			password: hashedPassword,
		});

		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: userCreation,
		});
	} catch (error) {
		res.status(201).json({
			success: false,
			message: "User created successfully",
			data: [],
		});
	}
};

const validateUser = async (req, res) => {
	let token = req.headers["authorization"].split(" ");
	token = token[1];

	try {
		jwt.verify(token, config.SECRET_KEY, (err, user) => {
			if (err) {
				res.status(401).json({
					success: false,
					message: "Token is invalid/ expired",
					error: err,
				});
			}

			res.status(200).json({ succes: true });
		});
	} catch (error) {
		console.log("Error :- validating user JWT", error);
	}
};

module.exports = { validateLogin, registerUser, validateUser };
