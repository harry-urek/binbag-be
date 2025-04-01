const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// createUser
const createUser = async (req, res) => {
  const { name, email, username, password, address } = req.body;

  try {
    const existingUsername = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });
    if (existingUsername || existingEmail) {
      return res.status(401).send({ message: "username/Email already exists." });
    }

    const user = await User.create({
      name,
      username,
      email,
      password,
      address,

      bio: req.body.bio,
      profilePicture: req.body.profilePicture,
    });
    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }

};

const loginUser = async (usernameOrEmail, password) => {
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  }).select("+password");
  if (!user) {
    throw new Error("User not found");

  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};


const updateUserById = async (id, values) => {
  const user = await User.findByIdAndUpdate(id, values, { new: true });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};


module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUserById,
};




