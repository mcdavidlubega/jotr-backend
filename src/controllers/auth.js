import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/users';

class authenticationController {
  static async loginUser(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists)
      return res.status(400).json({ message: 'Invalid email or password' });

    const verifyPassword = await bcrypt.compare(password, userExists.password);
    if (!verifyPassword)
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: userExists._id },
      process.env.TOKEN_SECRET
    );
    return res.status(200).send({ token });
  }
}

export default authenticationController;
