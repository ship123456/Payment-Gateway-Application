import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSettings } from "../../services/settingsService";
import "./Header.css";
import { FaBars } from "react-icons/fa";
import { usePayments } from "../../context/PaymentContext";
function Header({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const { payments } = usePayments();
  const settings = getSettings();

  const paymentAlerts = settings.notifications.paymentAlerts;

  const notifications = payments.slice(0, 2).map((payment) => ({
    id: payment.id,
    status: payment.status,
    customer: payment.customer,
    amount: payment.amount,
    currency: payment.currency,
  }));

  const handleBellClick = () => {
    if (!paymentAlerts) {
      toast.info("Payment alerts are disabled.");
      return;
    }

    setShowNotifications(!showNotifications);
  };

  return (
    <header className="header">
      <div className="header-info">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>

          <div className="header-title">
            <h1>Dashboard</h1>
            <p>Welcome back to PayFlow.</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="notification-wrapper">
            <button
              className={`icon-button ${!paymentAlerts ? "disabled-bell" : ""}`}
              onClick={handleBellClick}
            >
              <FaBell />

              {paymentAlerts && <span className="notification-dot"></span>}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">Notifications</div>

                {notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-icon">
                      {notification.status === "Success"
                        ? "✅"
                        : notification.status === "Pending"
                          ? "⏳"
                          : "❌"}
                    </div>

                    <div className="notification-content">
                      <div className="notification-title">
                        {notification.status === "Success"
                          ? "Payment Received"
                          : notification.status === "Pending"
                            ? "Payment Pending"
                            : "Payment Failed"}
                      </div>

                      <div className="notification-message">
                        {notification.status === "Success"
                          ? `${notification.customer} paid ${notification.currency} ${notification.amount}`
                          : notification.status === "Pending"
                            ? `${notification.id} is pending`
                            : `${notification.id} failed`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="profile-box"
            onClick={() => navigate("/dashboard/profile")}
          >
            <FaUserCircle />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
