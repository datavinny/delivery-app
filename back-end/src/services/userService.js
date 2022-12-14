const Joi = require('joi');
const HandleError = require('../utils/handleError');
const { User } = require('../database/models');
const { encryptPassword } = require('../utils/md5');
const { createToken } = require('../utils/jwt');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const createUser = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) throw new HandleError('BadRequest', 'Some required fields are missing');
  
  const { password } = user;
  const passwordHash = encryptPassword(password);

  if (await User.findOne({ where: { email: user.email } })) {
    throw new HandleError('Conflict', 'User already exists');
  }
  
  const { dataValues } = await User.create({ ...user, password: passwordHash });
  
  const token = createToken({ email: user.email, role: 'customer', userId: dataValues.id });

  return {
    token,
    id: dataValues.id,
    name: dataValues.name,
    email: dataValues.email,
    role: dataValues.role,
 };
};

const getUser = async (query) => User.findAll(query);

const getAllUsers = async () => User.findAll();

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
};