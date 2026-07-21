import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
function Settings() {
  const { user, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  const updatePassword = () => {
    if (!passwordData.currentPassword) {
      toast.error("Enter current password.");
      return;
    }
    if (!passwordData.newPassword) {
      toast.error("Enter new password.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      resetPassword(
        user.email,
        passwordData.currentPassword,
        passwordData.newPassword,
      );
      toast.success("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="settings-page">
      <h1>Change Password</h1>
      <p className="page-subtitle">Manage your security preferences.</p>
      <div className="settings-grid">
        {/* Security */}
        <div className="settings-card">
          <h2>Security</h2>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="primary-btn" onClick={updatePassword}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
export default Settings;
