import { getPayments } from "./paymentService";

const getDashboardStats = () => {
  const payments = getPayments();

  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) => payment.status === "Success",
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending",
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed",
  ).length;

  return {
    totalPayments,
    successfulPayments,
    pendingPayments,
    failedPayments,
  };
};

const getRecentPayments = (limit = 5) => {
  const payments = getPayments();

  return payments.slice(0, limit);
};

const getMonthlyPaymentData = () => {
  const payments = getPayments();
  console.log(payments);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chart = months.map((month) => ({
    month,
    payments: 0,
  }));

  payments.forEach((payment) => {
    const monthIndex = new Date(payment.date).getMonth();

    chart[monthIndex].payments++;
  });
  return chart;
};

export { getDashboardStats, getRecentPayments, getMonthlyPaymentData };
