const jwt = require('jsonwebtoken');
const verifyUser = (req, res, next) => {

  try {
    const { token } = req.cookies;
    const data = jwt.verify(token, 'aaaaa');
    if (!data) {
      res.send("error verify token");
    }
    next();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  verifyUser
}