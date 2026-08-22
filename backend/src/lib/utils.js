import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const secret = process.env.JWT_SECRET || "supersecretjwtkey_chat_app_987654321";
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // prevent XSS attacks
    sameSite: "lax", // robust cross-origin navigation support
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};
