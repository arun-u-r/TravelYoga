import User from "../model/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "sucessfully created", 
      data: saveUser });
  } catch (err) {
    res.status(500).json({
      success: false, 
      message: "Failed to create. try again." });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,{ $set: req.body, },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "sucessfully Updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to Update. try again." });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      sucess: true,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "failed to delete", });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "User found",
       data: user,  });
  } catch (err) {
    res.status(404).json({ 
      success: false, 
      message: "not found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find({})

    res.status(200).json({ 
       sucess: true, 
       message: "Succesful", 
       data: allUsers, });
  } catch (err) {
    res.status(404).json({
      sucess: false, 
      message: "not found" });
  }
};