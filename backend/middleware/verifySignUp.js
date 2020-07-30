let User = require('../models/user');
const verifySignUp = () => {
    // Email
    return (req, res, next) => {
      console.log(req.body);
      User.findOne({
        email: req.body.email
      }).then((user) => {
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }

        next();
      })
      .catch((err) =>{
        res.status(500).send({ message: err });
        return;
      })
    }
};
module.exports = verifySignUp;