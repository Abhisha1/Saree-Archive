const jwt = require("jsonwebtoken");

verifyToken = (token) => {
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded)).then(user => {
    return user.id;
  }).catch( err => {
    return res.status(401).send({ message: "Unauthorized!" });
  })
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;