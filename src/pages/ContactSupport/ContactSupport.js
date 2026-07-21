import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createTicket } from "../../services/supportService";
import "./ContactSupport.css";

function ContactSupport() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    subject: "",
    category: "Payment Issue",
    priority: "Medium",
    description: "",
    screenshot: null,
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];

      if (file && !file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        screenshot: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = {};

    if (!formData.subject.trim()) {
      validationErrors.subject = "Subject is required.";
    }

    if (!formData.description.trim()) {
      validationErrors.description = "Description is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors.");
      return;
    }

    createTicket({
      name: user.name,
      email: user.email,
      subject: formData.subject,
      category: formData.category,
      priority: formData.priority,
      description: formData.description,
      screenshot: formData.screenshot ? formData.screenshot.name : "",
    });

    toast.success("Support ticket submitted successfully!");

    navigate("/dashboard/support/tickets");
  };

  return (
    <div className="contact-support">
      <h1>Contact Support</h1>
      <p className="page-subtitle">
        Submit a support ticket and our team will help you.
      </p>

      <div className="support-card">
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>

            <input type="text" value={user?.name || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input type="email" value={user?.email || ""} readOnly />
          </div>
        </div>

        <div className="form-grid support-fields">
          <div className="form-group">
            <label>
              Subject <span className="complusory">*</span>
            </label>

            <input
              type="text"
              name="subject"
              placeholder="Enter ticket subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? "error" : ""}
            />

            {errors.subject && <p className="error-text">{errors.subject}</p>}
          </div>

          <div className="form-group">
            <label>
              Category <span className="complusory">*</span>
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Payment Issue</option>
              <option>Wallet Issue</option>
              <option>Account Issue</option>
              <option>Technical Issue</option>
              <option>Billing Issue</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Priority <span className="complusory">*</span>
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>
            Description
            <span className="complusory">*</span>
          </label>

          <textarea
            rows="5"
            name="description"
            placeholder="Describe your issue"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? "error" : ""}
          />

          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </div>

        <div className="form-group">
          <label>Attach Screenshot (Optional)</label>

          <input
            type="file"
            name="screenshot"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button className="primary-btn" onClick={handleSubmit}>
          Submit Ticket
        </button>
      </div>
    </div>
  );
}

export default ContactSupport;
