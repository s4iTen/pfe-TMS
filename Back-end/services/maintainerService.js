const Maintainer = require("../models/Maintainer");

const createMaintainer = async (maintainerData) => {
  const { image, fullName, Tel: tel, Email: email, Job: job } = maintainerData;

  try {
    const maintainer = new Maintainer({
      image,
      fullName,
      tel,
      email,
      job,
    });
    const result = await maintainer.save();
    return result;
  } catch (error) {
    console.error("Error creating maintainer:", error);
    throw error;
  }
};

const getAllMaintainers = async () => {
  try {
    return await Maintainer.find();
  } catch (error) {
    console.error("Error fetching maintainers:", error);
    throw error;
  }
};

const getMaintainerById = async (id) => {
  try {
    return await Maintainer.findById(id);
  } catch (error) {
    console.error("Error fetching maintainer by ID:", error);
    throw error;
  }
};

const updateMaintainer = async (id, updates) => {
  console.log(updates);

  try {
    return await Maintainer.findByIdAndUpdate(id, updates, { new: true });
  } catch (error) {
    console.error("Error updating maintainer:", error);
    throw error;
  }
};

const deleteMaintainer = async (id) => {
  try {
    return await Maintainer.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting maintainer:", error);
    throw error;
  }
};

module.exports = {
  createMaintainer,
  getAllMaintainers,
  getMaintainerById,
  updateMaintainer,
  deleteMaintainer,
};
