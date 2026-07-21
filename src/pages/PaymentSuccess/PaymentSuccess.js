import { FaCheckCircle, FaReceipt, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import "./PaymentSuccess.css";

function PaymentSuccess() {
  const navigate = useNavigate();
  const { state: payment } = useLocation();

  return (
    <div className="payment-success">
      <div className="success-card">
        <FaCheckCircle className="success-icon" />

        <h1>Payment Successful</h1>

        <p>Your payment has been processed successfully.</p>

        <div className="details">
          <div className="detail-row">
            <span>Payment ID</span>
            <strong>{payment.id}</strong>
          </div>

          <div className="detail-row">
            <span>Customer</span>
            <strong>{payment.customer}</strong>
          </div>

          <div className="detail-row">
            <span>Amount</span>
            <strong>
              {payment.currency} {payment.amount}
            </strong>
          </div>

          <div className="detail-row">
            <span>Payment Method</span>
            <strong>{payment.paymentMethod}</strong>
          </div>

          <div className="detail-row">
            <span>Order ID</span>
            <strong>{payment.orderId}</strong>
          </div>

          <div className="detail-row">
            <span>Date</span>
            <strong>{payment.date}</strong>
          </div>
        </div>

        <div className="success-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard/payment-history")}
          >
            <FaReceipt />
            View Transactions
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/dashboard/new-payment")}
          >
            <FaPlus />
            New Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
