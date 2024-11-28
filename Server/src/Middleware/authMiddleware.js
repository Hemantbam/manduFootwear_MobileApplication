import jwt from "jsonwebtoken";

const secretKey = "keyForFootwearMobileApplication986421@#$*_";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token not found" });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    req.user = decoded;
    next();
  });
};

export { verifyToken };
