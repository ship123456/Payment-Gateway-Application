import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {
  FaHome,
  FaCreditCard,
  FaHistory,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import "./Sidebar.css";
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [supportOpen, setSupportOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="logo">PayFlow</h2>
        <nav>
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
          {/* New Payment */}
          <NavLink
            to="/dashboard/new-payment"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaCreditCard />
            <span>New Payment</span>
          </NavLink>
          {/* Payment History */}
          <NavLink
            to="/dashboard/payment-history"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaHistory />
            <span>Payment History</span>
          </NavLink>
          {/* Profile */}
          <NavLink
            to="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaUser />
            <span>Profile</span>
          </NavLink>
          {/* Settings */}
          <NavLink
            to="/dashboard/change-password"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaCog />
            <span>Change Password</span>
          </NavLink>
          {/* Support */}
          <div
            className="menu-item"
            onClick={() => {
              setSupportOpen(!supportOpen);
              setSidebarOpen(false);
            }}
          >
            <FaQuestionCircle />
            <span>Support</span>
            <div className="arrow">
              {supportOpen ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          {supportOpen && (
            <div className="submenu">
              <NavLink
                to="/dashboard/support/contact"
                onClick={() => setSidebarOpen(false)}
              >
                Contact Support
              </NavLink>
              <NavLink
                to="/dashboard/support/tickets"
                onClick={() => setSidebarOpen(false)}
              >
                My Support Tickets
              </NavLink>
              <NavLink
                to="/dashboard/support/faq"
                onClick={() => setSidebarOpen(false)}
              >
                FAQ
              </NavLink>
            </div>
          )}
          {/* Logout */}
          <div className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
