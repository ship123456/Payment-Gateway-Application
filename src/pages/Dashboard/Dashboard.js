import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import "./Dashboard.css";
import PaymentChart from "../../components/Chart/PaymentChart";
import { usePayments } from "../../context/PaymentContext";
function Dashboard() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { dashboardStats, recentPayments } = usePayments();
  return (
    <div className="dashboard">
      <div className="card-grid">
        <div className="card">
          <div>
            <h3>Total Payments</h3>
            <h1>{dashboardStats.totalPayments}</h1>
          </div>
          <FaCreditCard className="card-icon blue" />
        </div>
        <div className="card">
          <div>
            <h3>Successful Payments</h3>
            <h1>{dashboardStats.successfulPayments}</h1>
          </div>
          <FaCheckCircle className="card-icon green" />
        </div>
        <div className="card">
          <div>
            <h3>Pending Payments</h3>
            <h1>{dashboardStats.pendingPayments}</h1>
          </div>
          <FaClock className="card-icon orange" />
        </div>
        <div className="card">
          <div>
            <h3>Failed Payments</h3>
            <h1>{dashboardStats.failedPayments}</h1>
          </div>
          <FaTimesCircle className="card-icon red" />
        </div>
      </div>
      <div className="dashboard-bottom">
        <div className="panel chart-panel">
          <h2>Monthly Payment Volume</h2>
          <PaymentChart />
        </div>
        <div className="panel">
          <div className="recent-header">
            <h2>Recent Payments</h2>
            <button
              className="view-all"
              onClick={() => navigate("/dashboard/payment-history")}
            >
              View All →
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.customer}</td>
                  <td>
                    {payment.currency} {payment.amount}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${payment.status.toLowerCase()}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => setSelectedPayment(payment)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedPayment && (
        <div className="modal-overlay" onClick={() => setSelectedPayment(null)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payment Details</h2>
              <button onClick={() => setSelectedPayment(null)}>×</button>
            </div>
            <div className="modal-details">
              <div>
                <span>Payment ID</span>
                <strong>{selectedPayment.id}</strong>
              </div>
              <div>
                <span>Customer</span>
                <strong>{selectedPayment.customer}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{selectedPayment.email}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{selectedPayment.phone}</strong>
              </div>
              <div>
                <span>Amount</span>
                <strong>
                  {selectedPayment.currency} {selectedPayment.amount}
                </strong>
              </div>
              <div>
                <span>Payment Method</span>
                <strong>{selectedPayment.paymentMethod}</strong>
              </div>
              <div>
                <span>Payment ID</span>
                <strong>{selectedPayment.orderId}</strong>
              </div>
              <div>
                <span>Description</span>
                <strong>{selectedPayment.description || "-"}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedPayment.status}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{selectedPayment.date}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
