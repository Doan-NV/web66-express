const express = require('express')
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const { verifyUser } = require('./middleware/authMiddlewate');
const { loginMiddleware, registerMiddleware } = require('./middleware/userMiddleware')
app.use(express.json());

const User = require('./models/user');
const db = require("./databse/connect");
const { login } = require('./service/auth.service');
const { getAllUser } = require('./service/user.service');
db;

// logic // base project

// call api 
// middleware 
// controller
// controller goi server ==> return kq
// controller tra ve ket qua
// LOGIN
app.post('/login', loginMiddleware, async (req, res) => {
	const { username, password } = req.body;
	const token = await login(username, password);
	console.log("🚀 ~ file: index.js:26 ~ app.post ~ token:", token)
	res.cookie("token", token);

	// return token to client
	res.send({ token });
});


//create user
app.post("/create-user", registerMiddleware, async (req, res) => {
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

// get user by id: example:  localhost:3000/user/1
app.get("/user/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.send(user);
	} catch (error) {
		res.send(error);
	}
});

// delete user by id
app.delete("/user", verifyUser, async (req, res) => {
	try {
		const { id } = req.body;
		await User.deleteOne({ _id: id });
		res.send({ message: "delete user success" });
	} catch (error) {
		res.send(error);
	}
});

// get list user
app.get("/users", verifyUser, async (req, res) => {

	try {
		const users = await getAllUser();
		res.send({ data: users });
	} catch (error) {
		res.send(error);
	}

});

app.post("/logout", (req, res) => {
	res.clearCookie("token");
	res.end();

});
// 100-300 api

app.listen(3000, (err) => {
	if (!err) {
		console.log("App is running at 3000");
	}
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuZ3V5ZW52YW5hIiwiaWF0IjoxNjgyMTc2MTc0LCJleHAiOjE2ODIxNzk3NzR9.RVgXFKxZRZqAKRiWwuohaKVFSSsWNmTIbGL24pWdxys