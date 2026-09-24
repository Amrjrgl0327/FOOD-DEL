import { User } from "../models/userSchema.js";

export const validateEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password required" });
  } else {
    next();
  }
};

export const checkIfUserExist = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "user not found" });
  } else {
    next();
  }
};

export const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(401).json({ message: "email already used" });
  } else {
    next();
  }
};
