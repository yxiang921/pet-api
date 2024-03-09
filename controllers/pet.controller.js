import Pet from "../models/pet.model.js";

export const addPet = async (req, res) => {
  try {
    const { petName, petType } = req.body;
    const userID = req.user._id;

    const newPet = new Pet({
      userID,
      petName,
      petType,
    });

    if (newPet) {
      await newPet.save();
      res.status(200).json({
        userID: newPet.userID,
        petName: newPet.petName,
        petType: newPet.petType,
      });
    } else {
      res.status(400).json({ error: "Invalid Pet Data" });
    }
  } catch (error) {
    console.log("Error In Pet Controller Because: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
