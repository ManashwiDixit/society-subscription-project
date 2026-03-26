import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: "No token" });
    }

    // split Bearer tokenn it only extracting token removing bearer
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  // role from token
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied (admin only)" });
  }

  next(); // allow if admin
};