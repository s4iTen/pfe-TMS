const statisticService = require("../services/statistiqueService");

const getTotalProperties = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalProperties = await statisticService.getTotalProperties(userId);
    res.status(200).json({ totalProperties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve total properties", error });
  }
};
const getTotalIncomes = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalIncomes = await statisticService.getTotalIncomes(userId);
    res.status(200).json({ totalIncomes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve total incomes", error });
  }
};

const getTotalExpenses = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalExpenses = await statisticService.getTotalExpenses(userId);
    res.status(200).json({ totalExpenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve total expenses", error });
  }
};
const getPaymentHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const paymentHistory = await statisticService.getPaymentHistory(userId);
    res.status(200).json({ paymentHistory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve payment history", error });
  }
};

const getMaintenanceStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const maintenanceStatus = await statisticService.getMaintenanceStatus(
      userId
    );
    res.status(200).json({ maintenanceStatus });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve maintenance status", error });
  }
};
module.exports = {
  getTotalProperties,
  getTotalIncomes,
  getTotalExpenses,
  getPaymentHistory,
  getMaintenanceStatus,
};
