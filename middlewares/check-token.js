import jwt from "jsonwebtoken";

const checkToken = (roles) => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = bearerToken.split(" ")[1];
      const key = "zxcfhffnhf";
      const isValid = jwt.verify(token, key);
      console.log(isValid);
      if (!roles.includes(isValid.role)) {
        return res.status(403).json({ message: "unauthorized" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default checkToken;
