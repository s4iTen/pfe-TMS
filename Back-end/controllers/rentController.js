const rentServices = require("../services/rentServices");

const createRent = async (req, res) => {
  const { userRent, userOwner, property, startDate, endDate, totalPrice } = req.body;
  console.log(req.body);
  

  if (!userRent || !userOwner || !property || !startDate || !endDate || !totalPrice) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newRent = await rentServices.createRent({
      userRent,
      userOwner,
      property,
      startDate,
      endDate,
      totalPrice,
    });
    res.status(201).json(newRent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create rent" });
  }
};

const getAllRents = async (req, res) => {
  try {
    const rents = await rentServices.getAllRents();
    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rents" });
  }
};

const getRent = async (req, res) => {
  const { id } = req.params;

  try {
    const rent = await rentServices.getRentById(id);
    if (!rent) {
      return res.status(404).json({ error: "Rent not found" });
    }
    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rent" });
  }
};

module.exports = {
  createRent,
  getAllRents,
  getRent,
};
