import mongoose from "mongoose";

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI).then(() => {
            console.log(`DB Connected Successful`);
        });
    } catch (error) {
        console.log(`DB Failed To Connected Because: ${error.message}`);
    }
}

export default conn;