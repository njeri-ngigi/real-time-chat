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
      foundUser = new UserModel({ email });
      await foundUser.save();
    }
    return foundUser;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

const deleteUser = async (email) => {
  try {
    await UserModel.findOneAndDelete({ email });
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

module.exports = {
  createUser, findUser, deleteUser,
};
