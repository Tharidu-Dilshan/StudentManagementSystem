const { AdminToken } = require("../model/AdminToken");
const jwt = require("jsonwebtoken");

let AdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  AdminToken.findOne(
    { AdminID: decoded.AdminID, token },
    (err, adminToken) => {
      if (err) throw err;
      if (!adminToken) {
        return res.json({
          isAuth: false,
        });
      }
      req.token = token;
      req.AdminID = decoded.AdminID;
      next();
    },
  );
};

module.exports = { AdminAuth };