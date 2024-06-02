const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const {
  postUserRepository,
  verifyEmail,
  getUsersRepository,
  getUserUMKM,
  getUserMahasiswa,
  checkUserExist,
  putUserByIdRepository,
} = require('../repositories/userRepositories');
const InvariantError = require('../exceptions/InvariantError');
const roles = require('../utils/roles');
const mapping = require('../utils/mapping');

async function postUserService({
  name, email, password, category,
}) {
  await verifyEmail({ email });

  const categoryLowerCase = category.toLowerCase();

  if (!roles[categoryLowerCase]) {
    throw new InvariantError('role tidak ditemukan');
  }

  const createdAt = new Date().toISOString();
  const profile = 'public/blank-profile.png';
  const hashedPassword = await bcrypt.hash(password, 10);

  const id = await postUserRepository({
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

async function getUsersService({ req }) {
  const users = await getUsersRepository();

  const mappedUsers = users.map((u) => ({
    ...u,
    profile: `http://${req.headers.host}/${u.profile}`,
  }));

  return mappedUsers;
}

async function getUserByIdService({ id, req }) {
  const user = await checkUserExist({ id });
  let mappedUser;

  if (user.category === 'UMKM') {
    const data = await getUserUMKM({ id });
    mappedUser = mapping.userMappedforUMKM({ data, req });
  } else if (user.category === 'MAHASISWA') {
    const data = await getUserMahasiswa({ id });
    mappedUser = mapping.userMappedforMahasiswa({ data, req });
  } else {
    throw new InvariantError('role tidak ditemukan');
  }

  return mappedUser;
}

async function putUserByIdService({
  id, name, password, profile, next,
}) {
  const result = await checkUserExist({ id });
  const updatedAt = new Date().toISOString();
  const hashedPassword = await bcrypt.hash(password, 10);

  const filename = `${Date.now()}-${profile.name}`;

  profile.mv(path.join(__dirname, '../public/') + filename, (error) => {
    if (error) {
      next(error);
    }
  });

  await putUserByIdRepository({
    id, name, password: hashedPassword, profile: `public/${filename}`, updatedAt,
  });

  if (result.profile !== 'public/blank-profile.png') {
    fs.rm(path.join(__dirname, '../') + result.profile, (error) => {
      if (error) {
        next(error);
      }
    });
  }
}

module.exports = {
  postUserService, getUsersService, getUserByIdService, putUserByIdService,
};
