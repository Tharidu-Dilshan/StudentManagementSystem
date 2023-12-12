const { AdminToken } = require("../model/AdminToken");
const jwt = require("jsonwebtoken");
import config from "../../configs";

let AdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Invalid authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_TOKEN);

    const adminToken = await AdminToken.findOne({
      AdminID: decoded.AdminID,
      token,
    });

    if (!adminToken) {
      return res.status(401).json({ isAuth: false, message: "Invalid token" });
    }

    req.token = token;
    req.AdminID = decoded.AdminID;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { AdminAuth };
