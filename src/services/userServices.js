const bcrypt = require('bcrypt');

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
const { userMapped } = require('../utils/mapping');
const deleteFile = require('../utils/deleteFile');

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

async function getUserByIdService({ userId, req }) {
  const user = await checkUserExist({ userId });
  let mappedUser;

  if (user.category === 'UMKM') {
    const data = await getUserUMKM({ userId });
    mappedUser = userMapped({ data, req });
  } else if (user.category === 'MAHASISWA') {
    const data = await getUserMahasiswa({ userId });
    mappedUser = userMapped({ data, req });
  } else {
    throw new InvariantError('role tidak ditemukan');
  }

  return mappedUser;
}

async function putUserByIdService({
  userId, name, profile,
}) {
  const result = await checkUserExist({ userId });
  const updatedAt = new Date().toISOString();

  await putUserByIdRepository({
    userId, name, profile, updatedAt,
  });

  deleteFile(result.profile);
}

module.exports = {
  postUserService, getUsersService, getUserByIdService, putUserByIdService,
};
