const User = require("../models/userModel");
const asyncHandler =require ("express-async-handler");
const { generateRefreshToken } = require("../config/refreshtoken");
const validateMongoDbId = require("../utils/validateMongodbId");
const{generateToken} = require("../config/jwtToken");
const createUser = asyncHandler(async (req, res) => {
    /**
     * TODO:Get the email from req.body 
     */
    const username = req.body.username;
    /**
     * TODO:With the help of email find the user exists or not
     */
    const findUser = await User.findOne({ username: username });
  
    if (!findUser) {
      /**
       * TODO:if user not found user create a new user
       */
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      /**
       * TODO:if user found then thow an error: User already exists
       */
      throw new Error("User Already Exists");
    }
  });


// Login a user


// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ username });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
  
      username: findAdmin?.username,


      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
// Get all users


      const logout = asyncHandler(async (req, res) => {
        const cookie = req.cookies;
        if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
        const refreshToken = cookie.refreshToken;
        const user = await User.findOne({ refreshToken });
      
        if (!user) {
          res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
          });
          return res.sendStatus(204); 
        }
        await User.findOneAndUpdate(user, {
          refreshToken: "",
        });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
        });
        res.sendStatus(204); 
      });



module.exports = {createUser ,  logout , loginAdmin     };