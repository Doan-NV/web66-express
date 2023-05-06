const User = require('../models/user');


const getUserByUsername = async (username) => {
  const user = User.findOne({username});
  return user;
};
// mongoose
const getAllUser = async () => {
  // check a. check b, check role, check params, 
  // limit, offset, sort, filt,...
  const users = await User.find().select({ "username": 1, "_id": 1 }); // 40-60
  return users;
}
module.exports = {
  getUserByUsername,
  getAllUser,
}