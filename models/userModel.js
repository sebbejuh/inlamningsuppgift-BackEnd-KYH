const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth');

// REGISTER USER
exports.registerUser = async (req, res) => {
  const { userName, password } = req.body;

  if(!userName || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }

  const salt = bcrypt.genSaltSync(10);

  bcrypt.hash(password, salt, (err, hash) => {
    if(err) {
      return res.status(500).json({
        message: 'Failed when encrypting the password'
      })
    }
    User.create({
      userName,
      passwordHash: hash
    })
    .then(user => {
      res.status(201).json({
        token: auth.generateToken(user)
      })
    })
  })
}
// END
// LOGIN USER
exports.loginUserWithUserNameAndPassword = (req, res) => {
  const { userName, password } = req.body;

  if(!userName || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }
  User.findOne({userName})  //hittar username som skickas in
  .then(user => {
    if(!user) {
      return res.status(401).json({
        message: 'Incorrect credentials'
      })
    }
    bcrypt.compare(password, user.passwordHash, (err, result) => {  //jämför det password som skickas in med passwordHash
      if(err) {
        return res.status(500).json({
          message: 'Something went wrong when decrypting the password'
        })
      }
      if(!result) {
        return res.status(401).json({
          message: 'Incorrect credentials'
        })
      }
      res.status(200).json({ token: auth.generateToken(user) }) //skickar token
    })
  })
}
// END
// GET USER DATA
exports.getUserData = (req, res) => {
  const { _id, displayName } = req.userData;

  User.findById(_id)
    .then(user => {
      res.status(200).json(user)
    })
  
}
//END