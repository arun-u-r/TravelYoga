import Booking from '../model/Booking.js';


export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({
            success:true,
            message:"Your tour is booked",
            data: savedBooking
        })
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

export const getAllBooking = async(req, res)=>{
    const id = req.params.id;
    try {
        const booking = await Booking.findById(id); 
        res.status(200).json({
            success:true,
            message: "successful",
            data:booking,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not found"
        })
    }
}
export const getSingleBooking = async(req, res)=>{
    try {
        const bookings = await Booking.find(); 
        res.status(200).json({
            success:true,
            message: "successful",
            data:bookings,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}