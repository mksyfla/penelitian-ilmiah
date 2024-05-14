const bcrypt = require('bcrypt');
const userRepositories = require('../repositories/userRepositories');
const AuthenticationError = require('../exceptions/AuthenticationError');
const InvariantError = require('../exceptions/InvariantError');
const roles = require('../utils/roles');

async function postUser({
  name, email, password, category,
}) {
  await userRepositories.verifyEmail({ email });

  const categoryLowerCase = category.toLowerCase();

  if (!roles[categoryLowerCase]) {
    throw new InvariantError('role tidak ditemukan');
  }

  const createdAt = new Date().toISOString();
  const picture = 'public/blank-profile.png';
  const hashedPassword = await bcrypt.hash(password, 10);

  const id = await userRepositories.postUser({
    name,
    email,
    password: hashedPassword,
    picture,
    category: roles[categoryLowerCase],
    createdAt,
    updatedAt: createdAt,
  });

  return id;
}

async function getUsers() {
  const users = await userRepositories.getUsers();
  return users;
}

async function login({ email, password }) {
  const result = await userRepositories.verifyAccount({ email });
  const match = await bcrypt.compare(password, result.password);

  if (!match) {
    throw new AuthenticationError('email atau password salah');
  }

  const mappedResult = {
    id: result.id,
    email: result.email,
    category: result.category,
  };

  return mappedResult;
}

module.exports = { postUser, getUsers, login };
