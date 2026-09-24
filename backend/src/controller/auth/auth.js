import bcrypt from "bcryptjs";
import { User } from "../../models/userSchema.js";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

const JWT_SECRET = "Amka";

const token = jwt.sign({ email: "email@yahoo.com" }, JWT_SECRET, {
  expiresIn: "7d",
});

const isValidToken = jwt.verify(token, JWT_SECRET);

const publicUser = (user) => {
  return {
    email: user.email,
    role: user.role,
    _id: user._id,
  };
};

const createToken = (user) => {
  return jwt.sign({ email: "user.email", role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signUpController = async (req, res) => {
  const { email, password, phoneNumber, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    const token = createToken(user);

    res.status(200).json({ message: "User Created", user: user, token });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error });
  }
};

export const loginController = async (req, res) => {
  const { user } = req;
  const { password } = req.body;

  try {
    const isPassMatching = await bcrypt.compare(password, user.password);

    if (!isPassMatching) {
      res.status(401).json({ message: "Wrong password" });
    }

    const token = createToken(user);

    res
      .status(200)
      .json({ message: "Successfully login", user: publicUser(user) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login user", error: error });
  }
};
