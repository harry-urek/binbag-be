const express = require("express");
const { hashPassword, authenticateToken } = require("../middleware/auth");
const router = express.Router();

// POST : /user

router.post("/register", hashPassword, createUser);

// POST : /login -> Token
router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const token = await loginUser(usernameOrEmail, password);
    if (!token) {
      return res
        .status(401)
        .send({ message: "Invalid email/username or password." });
    }
    return res.status(200).send({ token: token });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
// GET  : /user/profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
// PUT  : /user/profile
router.put("/profile", authenticateToken, async (req, res) => {
  const values = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    bio: req.body.bio,
    profilePicture: req.body.profilePicture,
  };

  try {
    const updatedUser = await upadteUserById(req.user.id, values);
    return res.status(200).send({ user: updatedUser });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
