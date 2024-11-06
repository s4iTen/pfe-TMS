const Rent = require("../models/Rents");
const Properties = require("../models/Proprety");
const cron = require("node-cron");
const { updateProperty } = require("./propretyServices");

const createRent = async (rentData) => {
  const { userRent, userOwner, property, startDate, endDate, totalPrice } =
    rentData;

  try {
    const rent = new Rent({
      userRent,
      userOwner,
      property,
      startDate,
      endDate,
      totalPrice,
    });
    await updateProperty((_id = property), { rentStatus: true });
    return await rent.save();
  } catch (error) {
    console.error("Error creating rent:", error);
    throw error;
  }
};

const getAllRents = async () => {
  try {
    return await Rent.find();
  } catch (error) {
    console.error("Error fetching rents:", error);
    throw error;
  }
};

const getRentById = async (id) => {
  try {
    return await Rent.findById(id);
  } catch (error) {
    console.error("Error fetching rent by ID:", error);
    throw error;
  }
};

const updateRentStatus = async () => {
  try {
    const expiredRents = await Rent.find({ endDate: { $lt: new Date() } });
    for (const rent of expiredRents) {
      await Properties.findByIdAndUpdate(rent.property, { rentStatus: false });
    }
  } catch (error) {
    console.error("Error updating rent status:", error);
  }
};

cron.schedule("* * * * *", updateRentStatus);

module.exports = {
  createRent,
  getAllRents,
  getRentById,
  updateRentStatus,
};
