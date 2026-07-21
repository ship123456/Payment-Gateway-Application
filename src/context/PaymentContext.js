import { createContext, useContext, useEffect, useState } from "react";
import {
  getPayments,
  createPayment as addPayment,
  deletePayment as removePayment,
  exportPayments as downloadCSV,
  searchPayments,
  filterPayments,
} from "../services/paymentService";
import {
  getDashboardStats,
  getRecentPayments,
  getMonthlyPaymentData,
} from "../services/dashboardService";
export const PaymentContext = createContext();
export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [recentPayments, setRecentPayments] = useState([]);
  const [monthlyChart, setMonthlyChart] = useState([]);
  const refreshPayments = () => {
    setPayments(getPayments());
    setDashboardStats(getDashboardStats());
    setRecentPayments(getRecentPayments());
    setMonthlyChart(getMonthlyPaymentData());
  };
  useEffect(() => {
    refreshPayments();
  }, []);
  const createPayment = (payment) => {
    try {
      const newPayment = addPayment(payment);
      console.log("NEW PAYMENT", newPayment);
      refreshPayments();
      return newPayment;
    } catch (error) {
      throw error;
    }
  };
  const deletePayment = (id) => {
    try {
      removePayment(id);
      refreshPayments();
    } catch (error) {
      throw error;
    }
  };
  const search = (query) => {
    if (!query.trim()) {
      refreshPayments();
      return;
    }
    setPayments(searchPayments(query));
  };
  const filter = (status) => {
    if (!status || status === "All Status") {
      refreshPayments();
      return;
    }
    setPayments(filterPayments(status));
  };
  const exportCSV = () => {
    downloadCSV();
  };
  return (
    <PaymentContext.Provider
      value={{
        payments,
        dashboardStats,
        recentPayments,
        monthlyChart,
        createPayment,
        deletePayment,
        search,
        filter,
        refreshPayments,
        exportCSV,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
export const usePayments = () => useContext(PaymentContext);
