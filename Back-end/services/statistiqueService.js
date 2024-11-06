const Property = require("../models/Proprety");
const Rent = require("../models/Rents");
const Expense = require("../models/Expence");
const getTotalProperties = async (userId) => {
  try {
    const totalProperties = await Property.countDocuments({
      userOwner: userId,
    });
    return totalProperties;
  } catch (error) {
    throw new Error("Error fetching total properties for user");
  }
};
const getTotalIncomes = async (userId) => {
  try {

    const rents = await Rent.find({ userOwner: userId }, "totalPrice");

    const totalIncomes = rents.reduce((sum, rent) => sum + rent.totalPrice, 0);

    return totalIncomes;
  } catch (error) {
    throw new Error("Error fetching total incomes for user");
  }
};

const getTotalExpenses = async (userId) => {
  try {
    const expenses = await Expense.find(
      { ownerId: userId, status: "Completed" },
      "price"
    );
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.price,
      0
    );

    return totalExpenses;
  } catch (error) {
    throw new Error("Error fetching total expenses for user");
  }
};

const getPaymentHistory = async (userId) => {
  try {
    const rents = await Rent.find({ userOwner: userId })
      .select("startDate endDate totalPrice")
      .sort({ startDate: -1 });


    return rents.map((rent) => ({
      paymentDate: rent.startDate,
      amount: rent.totalPrice,
      status: "Paid",
    }));
  } catch (error) {
    throw new Error("Failed to retrieve payment history");
  }
};

const getMaintenanceStatus = async (userId) => {
  try {
    const expenses = await Expense.find({ ownerId: userId })
      .select("message status")
      .sort({ status: 1 });


    return expenses.map((expense) => ({
      requestId: expense._id,
      message: expense.message,
      status: expense.status,
    }));
  } catch (error) {
    throw new Error("Failed to retrieve maintenance status");
  }
};
module.exports = {
  getTotalProperties,
  getTotalIncomes,
  getTotalExpenses,
  getPaymentHistory,
  getMaintenanceStatus,
};
