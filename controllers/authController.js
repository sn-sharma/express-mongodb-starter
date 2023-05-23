const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const AccessToken = require("../models/accessToken");

// API Health
exports.health = (req, res) => {
    res.send("APIs are running...");
};

// Login
exports.login = async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    const validUser = await bcrypt.compare(req.body.password.toString(), user.password);

	if (validUser === false) {
		res.send(401, {status: "Unauthorized"})
	}else{
        let accessToken = await jwt.sign({user_id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET_TOKEN);

        await AccessToken.updateOne({email: req.body.email}, {access_token: accessToken}, { upsert: true });

        res.send(200, {user_id: user._id, access_token: accessToken})
    }
};