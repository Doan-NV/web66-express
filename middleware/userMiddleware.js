const { users } = require("../data");



const loginMiddleware = (req, res, next) => {
  const {username, password} = req.body;
  console.log("chay vaof day");
  if(!username || !password) {
    res.send( "username or password is not undefined");
  };
  // map nhan vaof 1 array ==> 1 array co chieu dai = array dau vao
  next()
};
const registerMiddleware = (req, res, next) => {
  const {username, password} = req.body;
  if(!username || !password) {
    res.send( "username or password is not undefined");
  };
  // map nhan vaof 1 array ==> 1 array co chieu dai = array dau vao
  next()
};


module.exports = {
  loginMiddleware,
  registerMiddleware
}