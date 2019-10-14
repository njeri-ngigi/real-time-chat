const { UserModel } = require('../models/user');

const findUser = async (email) => {
  try {
    return UserModel.findOne({ email });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

const createUser = async (email) => {
  try {
    let foundUser = await findUser(email);
    if (!foundUser) {
      foundUser = await UserModel.create({ email });
    }
    return foundUser;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

const fetchAllUsers = async () => {
  try {
    return UserModel.find();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};


module.exports = {
  createUser, findUser, fetchAllUsers,
};
