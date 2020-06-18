var bcrypt = require('bcryptjs');
var User = require('../models/user');


exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.password;

  bcrypt.hash(password, 12)
  .then(hash => {
    return User.findAll({where: {
      email: email
    }})
    .then(user => {
      if (user.length > 0) {
        throw new Error("User already exists");
      }
      return User.create({
        email: email,
        password: hash
      })
    })
    .then(user => {
      console.log(user);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => console.log(err));
}

exports.loginRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("body", req.body);
  User.findAll({where: {email: email}})
  .then(user => {
    console.log("user", user);
    if(user.length > 0) {
      console.log("user0", user[0]);
      console.log("password", user[0].password);
      bcrypt.compare(password, user[0].password)
      .then(result => {
        if(!result) throw new Error('Incorrect Password')
        req.session.user = user;
        res.redirect('/');
      })
      .catch(err => {console.log(err)})
    } else {
      throw new Error('User not found');
    }
  })
  .catch(err => { console.log(err) })
}