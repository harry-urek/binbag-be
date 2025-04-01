const user = require(../models/userModel);

// createUser
const createUser = async (req,res) => {
    const { name, email, username, password, address } = req.body;

    try {
        const existingUsername = await user.findOne({ username });
        const existingEmail = await user.findOne({ email });
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
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
    
};



// loginUser
// findUserById
// updateUserById
