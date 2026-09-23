import bcrypt from "bcryptjs";
import { User } from "../../models/userSchema.js";

const SALT_ROUNDS = 10;

export const signUpController = async (req, res) => {
  console.log("req", req.body);
  const { email, password, phoneNumber, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    res.status(200).json({ message: "User Created", user: user });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error });
  }
};

export const loginController = async (req, res) => {
  console.log("body", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("user", user.password);
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }

    const isPassMatching = await bcrypt.compare(password, user.password);
    console.log("hello this is pass matching", isPassMatching);
    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login user", error: error });
  }
};
