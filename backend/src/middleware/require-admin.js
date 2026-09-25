export const requireAdmin = async (req, res, next) => {
  const user = req.user;

  if (user.role !== "admin") {
    res.status(400).json({ message: "Admin only" });
  } else {
    next();
  }
};
