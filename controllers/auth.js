const User      = require('@models/User');
const Token     = require('@models/Token');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

const { registerValidation, loginValidation } = require('@validation');

module.exports = {
  token: async (req, res) => {
    const cookies = req.cookies;
    if( !cookies?.jwt ) return res.status(401).send('no cookies exists');

    const refreshToken = cookies.jwt;
    if( refreshToken == null ) return res.status(401).send('no refreshToken exists');
    
    const tokenExists = await Token.findOne({ refresh_token: refreshToken });
    if( !tokenExists ) return res.status(401).send('Can\'t find token');

    const user = await User.findOne({ _id: tokenExists.user_id });
    if( !user ) return res.status(400).send('Email not found');

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if( err ) return res.sendStatus(403);
        const accessToken = jwt.sign({
          _id: user._id,
          _info: {
            roles: user.roles
          }
        }, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_SECRET_EXPIRY});
        return res.json({ accessToken: accessToken });
    });
  },
  register: async (req, res) => {
    // validate the information
    const { error, value } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if( emailExists ) return res.status(400).send('Email already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        return res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    // validate the information
    const { error, value } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if email does not exist
    const user = await User.findOne({email: req.body.email});
    if( !user ) return res.status(400).send('Email not found');

    // if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // create and assign JWT
    const token = jwt.sign({
      _id: user._id,
      _info: {
        name: user.name,
        roles: user.roles
      }
    }, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_SECRET_EXPIRY});
    
    // Check if user already has refresh token
    const tokenCheck = await Token.findOne({user_id: user._id});
    
    if( tokenCheck ){

      res.cookie("jwt", tokenCheck.refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.json({accessToken: token});
    }

    // Create a new Refresh Token
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    
    // create a new auth token in database
    const authToken = new Token({
        user_id: user._id,
        expires_in: process.env.TOKEN_SECRET_EXPIRY,
        refresh_token: refreshToken
    });

    try{
        // Save the token
        const savedToken = await authToken.save();

        res.cookie("jwt", savedToken.refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({ accessToken: token });

    }catch(err){
        res.status(400).send(err);
    }
  },
  logout: async (req, res) => {

    const cookies = req.cookies;
    if( !cookies?.jwt ) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    // Check if token exists
    const tokenExists = await Token.findOne({ refresh_token: refreshToken });
    tokenExists.remove();

    if( !tokenExists ){
      //res.clearCookie("jwt", { httpOnly: true }); Serves on HTTPS for production
      res.clearCookie("jwt");
      return res.sendStatus(204);
    }

    res.clearCookie("jwt");
    return res.sendStatus(204);
  },
  delete: () => {

  },
  getAll: (req, res) => {
    User.find({}).then(function (users) {
      res.send(users);
    });
  },
  update: async (req, res) => {
    //You can pass req.body directly or you can separate object
    const { name, email } = req.body;
    let options = {};

    if( !req.body ) res.status(400).send('No information provided');

    console.log(req.body);

    console.log(req.body.name);
    console.log(req.body.email);

    if( req.body.name ) options['name'] = req.body.name;
    if( req.body.email ) options['email'] = req.body.email;

    const { id } = req.params;
    const filter = { _id : id }

    const updatedUser = await User.findOneAndUpdate(filter, options, { new: true }).catch(error => {
      return res.status(500).send(error);
    });

    return res.send({user: updatedUser});
  }
};