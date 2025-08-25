import User from "../model/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    // Compare password
    const matched_password = await bcrypt.compare(password, user.password);
    if (!matched_password) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    // Generate JWT
    const token = jwt.sign(
      { uId: user._id, email: user.email },
      process.env.SECRET_KEY || "mysecretkey",
      { expiresIn: "1h" } // correct format
    );

    return res.status(200).json({
      message: "User logged in successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        nameLogo: user.nameLogo,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Failed to login", error: err });
  }
};
