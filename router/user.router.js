const express = require("express");
const { verifyUser, getInfo } = require("../middleware/authMiddlewate");
const { loginMiddleware, registerMiddleware } = require("../middleware/userMiddleware");
const Post = require("../models/post")
const { login } = require("../service/auth.service");
const { getAllUser } = require("../service/user.service");
const userRoute = express.Router();
const User = require('../models/user');
const { default: mongoose } = require("mongoose");

userRoute.get("/doannv", (req, res) => {res.send("doannv")});

userRoute.post("/create-user", registerMiddleware, async (req, res) => {
	const { username, password } = req.body;
	try {
		const userExisted = await User.findOne({ username });
		if (userExisted) {
			res.send("user already exist");
			return;
		}
		const user = await User.create({ username, password });
		res.send(user);
	} catch (error) {
		res.send(error)
	}
});

userRoute.post('/login', loginMiddleware, async (req, res) => {
	const { username, password } = req.body;
	const token = await login(username, password);
	res.cookie("token", token);
	res.send({ token });
});

userRoute.get("/user/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.send(user);
	} catch (error) {
		res.send(error);
	}
});
// call api ==> di qua middleware ==> service ==> response for client
userRoute.get("/users", verifyUser, async (req, res) => {

	try {
		const users = await getAllUser();
		res.send({ data: users });
	} catch (error) {
		res.send(error);
	}

});

userRoute.post("/logout", (req, res) => {
	res.clearCookie("token");
	res.end();

});


userRoute.delete("/user", verifyUser, async (req, res) => {
	try {
		const { id } = req.body;
		await User.deleteOne({ _id: id });
		res.send({ message: "delete user success" });
	} catch (error) {
		res.send(error);
	}
});


// validate dau vao
userRoute.post("/create-post",verifyUser, async (req, res) => {
  const {content, title} = req.body;
  const {id: userId} = getInfo(req.cookies.token);

	const newPost = {
		content, title, user: userId
	};

	const data = await Post.create(newPost);
	const user = await User.findById(new mongoose.Types.ObjectId(userId));
	user.posts.push(data.id);
	await user.save();
  res.send(data);
})

userRoute.get("/get-profile",verifyUser, async (req, res) => {
  const {id} = getInfo(req.cookies.token);
	const profile = await User.findById(new mongoose.Types.ObjectId(id)).populate("posts");
  res.send(profile);
});

userRoute.get("/get-detail-post/:postId",verifyUser, async (req, res) => {
  const {postId} = req.params;
	const profile = await Post.findById(new mongoose.Types.ObjectId(postId)).populate("user");
  res.send(profile);
})
module.exports = {userRoute};




