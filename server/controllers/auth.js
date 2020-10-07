const config = require('../config/auth.config');
const db = require('../models/index.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.signup = (req, res) => {
  console.log('db exists?', db.models);
  console.log('db.userfactory exists?', db.UserFactory);

  // Save User to Database
  return db.UserFactory.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((data) => {
      if (!data.username) {
        db.UserFactory.create({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        }).then(res.send({ message: 'User was registered successfully!' }));
      } else {
        res.send({ message: 'Username taken' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  db.UserFactory.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
