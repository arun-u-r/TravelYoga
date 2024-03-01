import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully Registerd",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to Register",
    });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const userData = user.toObject();
    const { password, role, ...rest } = userData;

    //jwt token creation
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10d" }
    );
    //  console.log(token)
    // set token in browser cookie an send res to client

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        success: true,
        message: "sucessfully logedin",
        data: { ...rest },
        role,
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
