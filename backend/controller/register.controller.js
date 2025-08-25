import User from "../model/users.model.js";
import bcrypt from "bcrypt";

export const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    // Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered!" });
    }

    // Hash password
    const hash_password = await bcrypt.hash(password, 10);

    // Profile picture if uploaded
    let profilePicPath = "";
    if (req.file) {
      profilePicPath = req.file.filename;
    }

    // Create user
    const newUser = new User({
      name,
      email,
      password: hash_password,
      profilePicture: profilePicPath,
      nameLogo: name.charAt(0).toUpperCase(),
    });

    await newUser.save();

    return res
      .status(201)
      .json({ msg: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ msg: "Server error!", error: err });
  }
};
