const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  const token = bearerHeader ? bearerHeader.split(" ")[1] : "";

  jwt.verify(token, process.env.JWT_CODE, (err, authData) => {
    if (err) return res.status(403).send("Invalid Access Token");

    req.user = authData.result;
    next();
  });
}

module.exports = { validateToken };
