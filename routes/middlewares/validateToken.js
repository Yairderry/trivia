function validateToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) return res.status(401).send("Access Token Required");

  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_CODE, (err, authData) => {
    if (err) return res.status(403).send("Invalid Access Token");

    req.user = authData.result;
    next();
  });
}

module.exports = { validateToken };
