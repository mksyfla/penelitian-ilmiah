const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const userRepositories = require('../repositories/userRepositories');
const InvariantError = require('../exceptions/InvariantError');
const roles = require('../utils/roles');
const mapping = require('../utils/mapping');

async function postUser({
  name, email, password, category,
}) {
  await userRepositories.verifyEmail({ email });

  const categoryLowerCase = category.toLowerCase();

  if (!roles[categoryLowerCase]) {
    throw new InvariantError('role tidak ditemukan');
  }

  const createdAt = new Date().toISOString();
  const profile = 'public/blank-profile.png';
  const hashedPassword = await bcrypt.hash(password, 10);

  const id = await userRepositories.postUser({
    name,
    email,
    password: hashedPassword,
    profile,
    category: roles[categoryLowerCase],
    createdAt,
    updatedAt: createdAt,
  });

  return id;
}

async function getUsers({ req }) {
  const users = await userRepositories.getUsers();

  const mappedUsers = users.map((u) => ({
    ...u,
    profile: `http://${req.headers.host}/${u.profile}`,
  }));

  return mappedUsers;
}

async function getUserById({ id, req }) {
  const user = await userRepositories.checkUserExist({ id });
  let mappedUser;

  if (user.category === 'UMKM') {
    const data = await userRepositories.getUserUMKM({ id });
    mappedUser = mapping.userMappedforUMKM({ data, req });
  } else if (user.category === 'MAHASISWA') {
    const data = await userRepositories.getUserMahasiswa({ id });
    mappedUser = mapping.userMappedforMahasiswa({ data, req });
  } else {
    throw new InvariantError('role tidak ditemukan');
  }

  return mappedUser;
}

async function putUserById({
  id, name, email, password, profile, next,
}) {
  const result = await userRepositories.checkUserExist({ id });
  const updatedAt = new Date().toISOString();
  const hashedPassword = await bcrypt.hash(password, 10);

  const filename = `${Date.now()}-${profile.name}`;

  profile.mv(path.join(__dirname, '../public/') + filename, (error) => {
    if (error) {
      next(error);
    }
  });

  await userRepositories.putUserById({
    id, name, email, password: hashedPassword, profile: `public/${filename}`, updatedAt,
  });

  fs.rm(path.join(__dirname, '../') + result.profile, (error) => {
    if (error) {
      next(error);
    }
  });
}

module.exports = {
  postUser, getUsers, getUserById, putUserById,
};