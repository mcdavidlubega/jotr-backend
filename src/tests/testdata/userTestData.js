import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../../models/users';

const uid1 = new mongoose.Types.ObjectId();
const uid2 = new mongoose.Types.ObjectId();
const uid3 = new mongoose.Types.ObjectId();
const uid4 = new mongoose.Types.ObjectId();
const uid5 = new mongoose.Types.ObjectId();
const uid6 = new mongoose.Types.ObjectId();
const uid7 = new mongoose.Types.ObjectId();
const uid8 = new mongoose.Types.ObjectId();
const uid9 = new mongoose.Types.ObjectId();

const uIds = { uid1, uid2, uid3, uid4, uid5, uid6, uid7, uid8, uid9 };

async function createUsers() {
  const password = '12345678';
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const users = [
    {
      _id: uid1,
      userName: 'User1',
      email: 'user1@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'One',
      role: 'admin',
    },
    {
      _id: uid2,
      userName: 'User2',
      email: 'user2@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'Two',
      role: 'user',
    },
    {
      _id: uid3,
      userName: 'User3',
      email: 'user3@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'Three',
      role: 'user',
    },
    {
      _id: uid4,
      userName: 'User4',
      email: 'user4@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'Four',
      role: 'user',
    },
    {
      _id: uid5,
      userName: 'User5',
      email: 'user5@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'Five',
      role: 'user',
    },
    {
      _id: uid6,
      userName: 'User6',
      email: 'user6@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'Six',
      role: 'user',
    },
    {
      _id: uid7,
      userName: 'User7',
      email: 'user7@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'Seven',
      role: 'user',
    },
    {
      _id: uid8,
      userName: 'User8',
      email: 'user8@gmail.com',
      password: hashedPass,
      firstName: 'User',
      lastName: 'Eight',
      role: 'user',
    },
  ];
  await User.insertMany(users);
}

async function deleteUsers() {
  await User.deleteMany({});
}

export { uIds, createUsers, deleteUsers };
