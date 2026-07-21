import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        company: user.company || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSave = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email.";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors.");
      return;
    }

    try {
      updateProfile({
        ...user,
        ...formData,
      });

      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <p className="page-subtitle">
        Manage your personal and company information.
      </p>

      <div className="profile-card">
        <div className="avatar-section">
          <div className="avatar">
            {formData.name
              ? formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </div>

          <div>
            <h2>{formData.name || "User"}</h2>
            <p>Business Account</p>
          </div>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />

            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />

            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
            />

            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="profile-buttons">
          <button className="primary-btn" onClick={handleSave}>
            Save Changes
          </button>

          <button className="secondary-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
