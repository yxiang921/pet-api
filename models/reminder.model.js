import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;