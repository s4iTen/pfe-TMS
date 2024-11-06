const expenceService = require("../services/expenceService");

const createExpence = async (req, res) => {
  const { propertyId, message, ownerId } = req.body;
  if (!propertyId || !message || !ownerId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newExpence = await expenceService.createExpence({
      propertyId,
      message,
      ownerId,
      status: "pending",
    });
    res.status(201).json(newExpence);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expence" });
  }
};

const getAllExpence = async (req, res) => {
  try {
    const expences = await expenceService.getAllExpence();
    res.status(200).json(expences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expences" });
  }
};

const getExpence = async (req, res) => {
  const { id } = req.params;

  try {
    const expence = await expenceService.getExpenceById(id);
    if (!expence) {
      return res.status(404).json({ error: "Expence not found" });
    }
    res.status(200).json(expence);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expence" });
  }
};

const updateExpenceStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const updatedExpence = await expenceService.updateExpenceStatus(id, status);
    if (!updatedExpence) {
      return res.status(404).json({ error: "Expence not found" });
    }
    res.status(200).json(updatedExpence);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expence status" });
  }
};
const updateExpenceDetails = async (req, res) => {
  const { id, price, maintainerId: maintainer } = req.body;

  const status = "Completed";

  if (!price || !maintainer) {
    return res.status(400).json({ error: "Price and maintainer are required" });
  }

  try {
    const updatedExpence = await expenceService.updateExpenceDetails(
      id,
      price,
      maintainer,
      status
    );
    if (!updatedExpence) {
      return res.status(404).json({ error: "Expence not found" });
    }
    res.status(200).json(updatedExpence);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expence details" });
  }
};

module.exports = {
  createExpence,
  getAllExpence,
  getExpence,
  updateExpenceStatus,
  updateExpenceDetails,
};
