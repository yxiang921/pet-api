import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    console.log("receive fetch")
    const { username, password, confirmPassword, email } = req.body;


    console.log("receive fetch 2")

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password Not Match" });
    }
    console.log("receive fetch 3")

    const users = await User.find();
    const userExist = users.find((user) => user.username === username);

    if (userExist) {
      return res.status(400).json({ error: "Username already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: profilePic
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error In Signup Controller Because: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("login api start")

    const user = await User.findOne({ email });
    const passwordCompare = await bcrypt.compare(
      password,
      user?.password || ""
    );
    console.log("login api start 2")

    if (!user || !passwordCompare) {
      console.log("invalid acc")
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    console.log("login api start 1")
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullname: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error In Login Controller Because: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Logged Out Successful");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
