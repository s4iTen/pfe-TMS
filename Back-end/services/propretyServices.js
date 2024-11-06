const Property = require("../models/Proprety");

const createProperty = async (propertyData) => {
  const {
    title,
    description,
    bedrooms,
    bathrooms,
    rent,
    adress,
    photos,
    userOwner,
  } = propertyData;
  try {
    const property = new Property({
      title,
      description,
      bedrooms,
      bathrooms,
      rent,
      adress,
      photos,
      userOwner,
    });
    return await property.save();
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};
const getAllProperty = async () => {
  try {
    return await Property.find();
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

const getPropertyById = async (id) => {
  try {
    return await Property.findById(id);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    throw error;
  }
};
const updateProperty = async (_id, updates) => {
  console.log("🚀 ~ updateProperty ~ id:", _id);
  try {
    return await Property.findByIdAndUpdate(_id, updates, { new: true });
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

const deleteProperty = async (id) => {
  try {
    return await Property.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

module.exports = {
  createProperty,
  getAllProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
