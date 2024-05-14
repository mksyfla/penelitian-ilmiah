const bcrypt = require('bcrypt');
const { postUser, verifyEmail, getUsers } = require('../repositories/userRepositories');
const InvariantError = require('../exceptions/InvariantError');

async function postUserService({
  name, email, password, category,
}) {
  await verifyEmail({ email });

  if (category < 1 || category > 2) {
    throw new InvariantError('kategori ini tidak ada');
  }

  const createdAt = new Date().toISOString();
  const picture = 'public/blank-profile.png';
  const hashedPassword = await bcrypt.hash(password, 10);

  const id = await postUser({
    name,
    email,
    password: hashedPassword,
    picture,
    category,
    createdAt,
    updatedAt: createdAt,
  });

  return id;
}

async function getUsersService() {
  const users = await getUsers();

  return users;
}

module.exports = { postUserService, getUsersService };
