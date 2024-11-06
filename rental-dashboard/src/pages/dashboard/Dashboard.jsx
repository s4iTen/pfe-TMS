import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaintenanceStatus,
  getPaymentHistory,
  getTotalExpenses,
  getTotalIncomes,
  getTotalProperty,
} from "../../store/dashboard/action";

const StatComponent = ({ data }) => {
  const darkMode = useSelector((state) => state.global.mode);
  return (
    <div
      className={`flex-1 space-y-4 min-h-[15vh] ${
        darkMode === "dark" ? "bg-[#333]" : "bg-[#FFF]"
      } p-4 rounded-md`}
    >
      <h2 className="text-3xl font-bold">{data.title}</h2>
      <p
        className={`text-xl font-medium ${
          darkMode === "dark" ? "text-gray-300/50" : "text-gray-500"
        } `}
      >
        {data.value}
      </p>
    </div>
  );
};

const PaymentHistory = ({ payments }) => {
  const darkMode = useSelector((state) => state.global.mode);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      className={`flex flex-col w-full min-h-[30vh] ${
        darkMode === "dark" ? "bg-[#333] " : "bg-[#FFF] "
      } p-4 rounded-md`}
    >
      <h2 className="text-lg font-semibold mb-4">Payment History</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Payment Date</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments &&
            payments.map((payment, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2">{formatDate(payment.paymentDate)}</td>
                <td className="py-2">${payment.amount.toFixed(2)}</td>
                <td className="py-2">{payment.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const MaintenanceStatus = ({ requests }) => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <div
      className={`flex flex-col w-full min-h-[30vh] ${
        darkMode === "dark" ? "bg-[#333]" : "bg-[#FFF]"
      } p-4 rounded-md`}
    >
      <h2 className="text-lg font-semibold mb-4">Maintenance Status</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Request</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests &&
            requests.map((request, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2">
                  {request.message.split(" ").slice(0, 5).join(" ")}
                </td>
                <td
                  className={`py-2 ${
                    request.status === "Completed"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {request.status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.global.userId);
  useEffect(() => {
    dispatch(getTotalProperty(userId));
    dispatch(getTotalExpenses(userId));
    dispatch(getTotalIncomes(userId));
    dispatch(getPaymentHistory(userId));
    dispatch(getMaintenanceStatus(userId));
  }, [dispatch, userId]);

  const TotalProperty = useSelector(
    (state) => state.dashboardReducer.properties
  );
  const TotalIncome = useSelector((state) => state.dashboardReducer.income);
  const TotalExpence = useSelector((state) => state.dashboardReducer.expence);
  const paymentHistory = useSelector(
    (state) => state.dashboardReducer.payment.paymentHistory
  );
  const maintananceStatus = useSelector(
    (state) => state.dashboardReducer.maintanance.maintenanceStatus
  );

  const data = [
    {
      title: "Total Properties",
      value: TotalProperty?.totalProperties + " Properties",
    },
    {
      title: "Total Incomes",
      value: "$ " + TotalIncome?.totalIncomes?.toFixed(2),
    },
    {
      title: "Total Expenses",
      value: "$ " + TotalExpence?.totalExpenses?.toFixed(2),
    },
  ];

  return (
    <>
      <div className="flex md:flex-row flex-col gap-10">
        {data.map((data, index) => (
          <StatComponent
            data={data}
            key={index}
            className="flex-1 min-w-[200px] md:min-w-[300px]"
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center py-4 gap-10">
        <PaymentHistory payments={paymentHistory} />
        <MaintenanceStatus requests={maintananceStatus} />
      </div>
    </>
  );
};

export default Dashboard;
