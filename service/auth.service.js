const { getUserByUsername } = require("./user.service");
const jwt = require('jsonwebtoken');

const login = async (username, password) => {
  const user = await getUserByUsername(username);
  console.log("🚀 ~ file: auth.service.js:6 ~ login ~ user:", user)
	if (user === null || user.password !== password) {
		res.send("username or password invalid");
	};

	const token = await jwt.sign(
		{ id: user._id, username: user.username },  // require
		"aaaaa", // require
		{ expiresIn: "1h" } // options
	);

  return token;

}


module.exports = {
  login,
}