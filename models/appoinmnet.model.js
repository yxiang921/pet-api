import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    otherPurpose: {
        type: String,
        required: false,
    },
    dateTime: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;