const Expence = require("../models/Expence");

const createExpence = async (expenceData) => {
  try {
    const expence = new Expence(expenceData);
    return await expence.save();
  } catch (error) {
    console.error("Error creating expence:", error);
    throw error;
  }
};

const getAllExpence = async () => {
  try {
    return await Expence.find();
  } catch (error) {
    console.error("Error fetching expences:", error);
    throw error;
  }
};

const getExpenceById = async (id) => {
  try {
    return await Expence.findById(id);
  } catch (error) {
    console.error("Error fetching expence by ID:", error);
    throw error;
  }
};
const updateExpenceStatus = async (id, status) => {
  try {
    return await Expence.findByIdAndUpdate(id, { status }, { new: true });
  } catch (error) {
    console.error("Error updating expence status:", error);
    throw error;
  }
};

const updateExpenceDetails = async (id, price, maintainer, status) => {
  try {
    return await Expence.findByIdAndUpdate(id, { price, maintainer, status }, { new: true });
  } catch (error) {
    console.error("Error updating expence details:", error);
    throw error;
  }
};

module.exports = {
  createExpence,
  getAllExpence,
  getExpenceById,
  updateExpenceStatus,
  updateExpenceDetails,
};
