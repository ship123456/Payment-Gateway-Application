import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePayments } from "../../context/PaymentContext";
import "./NewPayment.css";
function NewPayment() {
  const navigate = useNavigate();
  const { createPayment } = usePayments();
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    phone: "",
    amount: "",
    currency: "INR",
    paymentMethod: "UPI",
    orderId: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    // Customer
    if (!formData.customer.trim()) {
      validationErrors.customer = "Customer name is required.";
    }
    // Email
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email address.";
    }
    // Phone
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Phone number must be exactly 10 digits.";
    }
    // Order ID
    if (!formData.orderId.trim()) {
      validationErrors.orderId = "Payment ID is required.";
    }
    // Amount
    if (!formData.amount) {
      validationErrors.amount = "Amount is required.";
    } else if (Number(formData.amount) <= 0) {
      validationErrors.amount = "Amount must be greater than 0.";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors.");
      return;
    }
    const payment = createPayment({
      ...formData,
      amount: Number(formData.amount),
    });
    toast.success("Payment created successfully!");
    setFormData({
      customer: "",
      email: "",
      phone: "",
      amount: "",
      currency: "INR",
      paymentMethod: "UPI",
      orderId: "",
      description: "",
    });
    setErrors({});
    navigate("/dashboard/payment-success", {
      state: payment,
    });
    toast.success("Payment created successfully!");
    setFormData({
      customer: "",
      email: "",
      phone: "",
      amount: "",
      currency: "INR",
      paymentMethod: "UPI",
      orderId: "",
      description: "",
    });
    setErrors({});
    navigate("/dashboard/payment-success", {
      state: payment,
    });
  };
  return (
    <div className="new-payment">
      <h1>New Payment</h1>
      <div className="payment-layout">
        {/* Left Side - Payment Form */}
        <div className="payment-form">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Customer Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  className={errors.customer ? "error" : ""}
                />
                {errors.customer && (
                  <p className="error-text">{errors.customer}</p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label>
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label>
                  Payment ID <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  placeholder="Enter orderId"
                  className={errors.orderId ? "error" : ""}
                />
                {errors.orderId && (
                  <p className="error-text">{errors.orderId}</p>
                )}
              </div>
              <div className="form-group">
                <label>
                  Amount <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={errors.amount ? "error" : ""}
                  placeholder="Enter amount"
                />
                {errors.amount && <p className="error-text">{errors.amount}</p>}
              </div>
              <div className="form-group">
                <label>
                  Currency <span className="required">*</span>
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EURO">EURO</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>
                Payment Method <span className="required">*</span>
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Wallet">Wallet</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter payment description"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="primary-btn">
                + Create Payment
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        {/* Right Side - Payment Summary */}
        <div className="payment-summary">
          <h2>Payment Summary</h2>
          <div className="summary-item">
            <span>Currency</span>
            <strong>{formData.currency}</strong>{" "}
          </div>
          <div className="summary-item">
            <span>Payment Method</span>
            <strong>{formData.paymentMethod}</strong>{" "}
          </div>
          <div className="summary-item">
            <span>Status</span>
            <strong className="draft">Draft</strong>
          </div>
          <div className="summary-item">
            <span>Estimated Fee</span>
            <strong>
              ₹{((Number(formData.amount) || 0) * 0.02).toFixed(2)}
            </strong>{" "}
          </div>
          <div className="summary-item total">
            <span>Total Amount</span>
            <strong>₹{Number(formData.amount) || 0}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewPayment;
