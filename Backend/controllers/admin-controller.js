const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signup = async (req, res, next) => {
  const { firstName, lastName, email, address, contactNumber, password } =
    req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingAdmin) {
    return res
      .status(400)
      .json({ message: 'Admin already exists! Login Instead' });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const admin = new Admin({
    firstName,
    lastName,
    email,
    address,
    contactNumber,
    password: hashedPassword,
    isAdmin: true,
  });

  try {
    await admin.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: admin });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: 'Admin not found. Signup Please' });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Inavlid Email / Password' });
  }
  const token = jwt.sign(
    { id: existingAdmin._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '35s',
    }
  );

  console.log('Generated Token\n', token);

  if (req.cookies[`${existingAdmin._id}`]) {
    req.cookies[`${existingAdmin._id}`] = '';
  }

  res.cookie(String(existingAdmin._id), token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: 'lax',
  });

  return res
    .status(200)
    .json({ message: 'Successfully Logged In', user: existingAdmin, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split('=')[1];
  if (!token) {
    res.status(404).json({ message: 'No token found' });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, admin) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid TOken' });
    }
    console.log(admin.id);
    req.id = admin.id;
  });
  next();
};

const getAdmin = async (req, res, next) => {
  const adminId = req.id;
  let admin;
  try {
    admin = await Admin.findById(adminId, '-password');
  } catch (err) {
    return new Error(err);
  }
  if (!admin) {
    return res.status(404).json({ messsage: 'Admin Not FOund' });
  }
  return res.status(200).json({ admin });
};
const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, admin) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed' });
    }
    res.clearCookie(`${admin.id}`);
    req.cookies[`${admin.id}`] = '';

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '35s',
    });
    console.log('Regenerated Token\n', token);

    res.cookie(String(admin.id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: 'lax',
    });

    req.id = admin.id;
    next();
  });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, admin) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Authentication failed' });
    }
    res.clearCookie(`${admin.id}`);
    req.cookies[`${admin.id}`] = '';
    return res.status(200).json({ message: 'Successfully Logged Out' });
  });
};

exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getAdmin = getAdmin;
exports.refreshToken = refreshToken;
