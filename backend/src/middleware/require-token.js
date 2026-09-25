import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const requireToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("")[1] || null;

  if (!token) {
    res.status(400).json({ message: "Token required" });
  }
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid token, try again" });
  }
};
