const propretyService = require("../services/propretyServices");

const createProperty = async (req, res) => {
  const {
    title,
    description,
    bedrooms,
    bathrooms,
    rent,
    adress,
    uploadedFiles: photos,
    userOwner,
  } = req.body;

  if (
    !title ||
    !description ||
    !bedrooms ||
    !bathrooms ||
    !rent ||
    !adress ||
    !photos ||
    !userOwner
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newProperty = await propretyService.createProperty({
      title,
      description,
      bedrooms,
      bathrooms,
      rent,
      adress,
      photos,
      userOwner,
    });
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: "Failed to create property" });
  }
};

const getAllProperty = async (req, res) => {
  try {
    const properties = await propretyService.getAllProperty();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

const getProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await propretyService.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property" });
  }
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProperty = await propretyService.updateProperty(id, updates);
    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await propretyService.deleteProperty(id);
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};

module.exports = {
  createProperty,
  getAllProperty,
  getProperty,
  updateProperty,
  deleteProperty,
};
