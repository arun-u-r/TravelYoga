import Tour from "../model/Tour.js";

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const saveTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "sucessfully created", 
      data: saveTour });
  } catch (err) {
    res.status(500).json({
      success: false, 
      message: "Failed to create. try again." });
  }
};

export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,{ $set: req.body, },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "sucessfully Updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to Update. try again." });
  }
};

export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "tour Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete", });
  }
};

export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tours = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "tour found",
       data: tours,  });
  } catch (err) {
    res.status(404).json({ 
      success: false, 
      message: "not found" });
  }
};

export const getAllTour = async (req, res) => {

  const page = parseInt(req.query.page);//######## for pagination 

  try {
    const tours = await Tour.find({})
    .populate('reviews')
    .skip(8 *page)
    .limit(8) ;

    res.status(200).json({ 
       success: true, 
       message: "Succesful", 
       count: tours.length,
       data: tours, });
  } catch (err) {
    res.status(404).json({
      success: false, 
      message: "not found" });
  }
};

export const getTourBySearch = async(req, res) => {

  const city = new RegExp(req.query.city, "i")
  const distance = parseInt(req.query.distance)
  const maxGroupSize = parseInt(req.query.maxGroupSize)

  try {
    const tours = await Tour.find({ 
      city, 
      distance:{$gte:distance},
      maxGroupSize:{$gte:maxGroupSize} 
    });
    res.status(200).json({
      success: true,
      message: "sucessful", 
      data: tours });
  } catch (err) {
    res.status(404).json({
      success: false, 
      message: "Not found.." });
    
  }

};

export const getFeaturedTour = async (req, res) => {
  try {
    const featuredTour = await Tour.find({ featured: true }).limit(8)
    res.status(200).json({
      success: true,
      message: "sucessful", 
      data: featuredTour });
  } catch (err) {
    res.status(404).json({
      success: false, 
      message: "not found" });
  }
};

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount()
    res.status(200).json({
      success: true,
      message: "sucessful", 
      data: tourCount });
  } catch (err) {
    res.status(500).json({
      success: false, 
      message: "Failed to fetch" });
  }
}