import bcrypt from 'bcrypt';
import User from '../models/users';

class userController {
  static async registerUsers(req, res) {
    const { userName, email, password, firstName, lastName } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: 'Email already in use' });

    const usernameExists = await User.findOne({ userName });
    if (usernameExists)
      return res.status(400).json({ message: 'Username already in use' });

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

  static async getuserProfile(req, res) {
    const user = await User.findOne({ userName: req.params.username });
    if (!user) return res.status(400).json({ message: 'User not found' });
    return res.status(200).json({
      _id: String(user._id),
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      socialMedia: user.socialMedia,
      tel: user.tel,
      bio: user.bio,
      website: user.website,
    });
  }

  static async updateUserProfile(req, res) {
    const user = await User.findOne({ userName: req.params.username });

    if (String(user._id) !== req.user.userId)
      return res.status(401).json({ message: 'Not authorized' });

    const { email, firstName, lastName, socialMedia, tel, bio, website } =
      req.body;

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: String(user._id) },
      {
        $set: {
          email,
          firstName,
          lastName,
          socialMedia,
          tel,
          bio,
          website,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      _id: updatedProfile._id,
      userName: updatedProfile.userName,
      email: updatedProfile.email,
      firstName: updatedProfile.firstName,
      lastName: updatedProfile.lastName,
      socialMedia: updatedProfile.socialMedia,
      tel: updatedProfile.tel,
      bio: updatedProfile.bio,
      website: updatedProfile.website,
    });
  }
}
/**
 * TODO: Figure out how to check whether the new updated email is not already in use
 * TODO: Add a way to update the social media array
 */
export default userController;
