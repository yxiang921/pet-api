import mongoose from "mongoose";


const petSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    petName: {
        type: String,
        required: true,
    },
    petType: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const Pet = mongoose.model("Pet", petSchema);

export default Pet;