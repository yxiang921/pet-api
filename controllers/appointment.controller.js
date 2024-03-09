import Appointment from "../models/appoinmnet.model.js";

export const addAppointment = async (req, res) => {
  try {
    const { purpose, otherPurpose, dateTime } = req.body;
    const userID = req.user._id;

    const newAppointment = new Appointment({
      userID,
      purpose,
      otherPurpose,
      dateTime,
    });

    if (newAppointment) {
      await newAppointment.save();
      res.status(200).json({
        userID: newAppointment.userID,
        purpose: newAppointment.purpose,
        otherPurpose: newAppointment.otherPurpose,
        dateTime: newAppointment.dateTime,
      });
    } else {
      res.status(400).json({ error: "Invalid Appointment Data" });
    }
  } catch (error) {
    console.log("Error In Appointment Controller Because: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAppointment = async (req, res) => {

  try {
    const userID = req.user._id;

    const appointments = await Appointment.find({
      userID: userID,
    });

    if (!appointments) {
      return res.status(200).json({ error: "No Message Found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
