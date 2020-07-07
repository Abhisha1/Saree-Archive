const jwt = require("jsonwebtoken");

verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET).id;
  } catch(err) {
      console.log(err);
      return null;
  }
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;