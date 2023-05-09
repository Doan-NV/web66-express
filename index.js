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
const { userRoute } = require('./router/user.router');
db;


app.use('/user', userRoute);
app.listen(3000, (err) => {
	if (!err) {
		console.log("App is running at 3000");
	}
})

