import bcrypt from 'bcrypt';
import User from '../models/users';

class userController {
  static async registerUsers(req, res) {
    const { userName, email, password, firstName, lastName } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: 'User already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      userName,
      email,
      password: hashedPass,
      firstName,
      lastName,
    });

    return res.status(201).json({
      Username: user.userName,
      Email: user.email,
      Password: '********',
      'First Name': user.firstName,
      'Last Name': lastName,
    });
  }
}

export default userController;
