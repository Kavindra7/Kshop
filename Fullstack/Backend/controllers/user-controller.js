const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signup = async (req, res, next) => {
  const { firstName, lastName, email, address, contactNumber, password } =
    req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User already exists! Login Instead' });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    firstName,
    lastName,
    email,
    address,
    contactNumber,
    password: hashedPassword,
    isAdmin: false,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: 'User not found. Signup Please' });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Inavlid Email / Password' });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '35s',
  });

  console.log('Generated Token\n', token);

  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = '';
  }

  res.cookie(String(existingUser._id), token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: 'lax',
  });

  return res
    .status(200)
    .json({ message: 'Successfully Logged In', user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split('=')[1];
  if (!token) {
    res.status(404).json({ message: 'No token found' });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid TOken' });
    }
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, '-password');
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
  if (!user) {
    return res.status(404).json({ messsage: 'User Not FOund' });
  }
  return res.status(200).json({ name: `${user.firstName} ${user.lastName}` });
};
const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed' });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = '';

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '35s',
    });
    console.log('Regenerated Token\n', token);

    res.cookie(String(user.id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: 'lax',
    });

    req.id = user.id;
    next();
  });
};

const forgotPassword = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      // Handle password mismatch error
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed' });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = '';
    return res.status(200).json({ message: 'Successfully Logged Out' });
  });
};

exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.forgotPassword = forgotPassword;
