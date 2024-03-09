import Reminder from "../models/reminder.model.js";

export const addReminder = async (req, res) => {
  try {
    const { time, remark } = req.body;
    const userID = req.user._id;

    const newReminder = new Reminder({
      userID,
      time,
      remark,
    });

    if (newReminder) {
      await newReminder.save();
      res.status(200).json({
        userID: newReminder.userID,
        time: newReminder.time,
        remark: newReminder.remark,
      });
    } else {
      res.status(400).json({ error: "Invalid Reminder Data" });
    }
  } catch (error) {
    console.log("Error In Reminder Controller Because: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const getReminder = async (req, res) => {

  try {
    const userID = req.user._id;

    const reminders = await Reminder.find({
      userID: userID,
    });

    if (!reminders) {
      return res.status(200).json({ error: "No Message Found" });
    }

    res.status(200).json(reminders);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
