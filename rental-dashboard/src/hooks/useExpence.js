import { useSelector, useDispatch } from "react-redux";
import { getExpence, updateExpenceStatus } from "../store/expence/action";
import useFetch from "./useFetch";

export function useExpence() {
  const dispatch = useDispatch();
  const { data } = useFetch(getExpence, (state) => state.expenceReducer);
  const users = useSelector((state) => state.userReducer.data);
  const properties = useSelector((state) => state.propertyReducer.data);
  const maintainers = useSelector((state) => state.maintainerReducer.data);

  const maintainerOptions = maintainers.map((maintainer) => ({
    value: maintainer._id,
    label: maintainer.fullName,
  }));
  const formFields = [
    {
      type: "select",
      label: "Maintainer",
      name: "maintainerId",
      options: maintainerOptions,
    },
    {
      type: "number",
      label: "Price",
      name: "price",
      placeholder: "Enter the Price",
    },
    {
      type: "button",
      label: "Apply",
      name: "applyButton",
      text: "Add Expense",
    },
  ];
  const transformExpense = (expense) => {
    const user = users.find((user) => {
      return user._id === expense.ownerId;
    });

    const property = properties.find(
      (property) => property._id === expense.propertyId
    );

    return {
      ...expense,
      ownerName: user ? user.firstName + " " + user.lastName : "Unknown User",
      propertyTitle: property ? property.title : "Unknown Property",
    };
  };

  const pendingExpenses = data
    .filter((expense) => expense.status === "pending")
    .map(transformExpense);

  const approvedExpenses = data
    .filter((expense) => expense.status === "approved")
    .map(transformExpense);

  const declinedExpenses = data
    .filter((expense) => expense.status === "declined")
    .map(transformExpense);

  const completedExpenses = data
    .filter((expense) => expense.status === "Completed")
    .map(transformExpense);

  const handleDecline = (id) => {
    console.log("🚀 ~ handleDecline ~ id:", id);
    dispatch(updateExpenceStatus({ id, status: "declined" }));
  };
  const handleApprove = (id) => {
    dispatch(updateExpenceStatus({ id, status: "approved" }));
  };

  return {
    pendingExpenses,
    approvedExpenses,
    declinedExpenses,
    completedExpenses,
    handleDecline,
    handleApprove,
    formFields,
  };
}
