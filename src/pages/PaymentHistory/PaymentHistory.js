import { useEffect, useState } from "react";
import { usePayments } from "../../context/PaymentContext";
import "./PaymentHistory.css";
import { FaDownload } from "react-icons/fa";
function PaymentHistory() {
  const { payments, search, filter, deletePayment, exportCSV } = usePayments();

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [isSmall, setIsSmall] = useState(false);

  const paymentsPerPage = 5;
  const indexOfLastPayment = currentPage * paymentsPerPage;

  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;

  const currentPayments = payments.slice(
    indexOfFirstPayment,
    indexOfLastPayment,
  );

  const totalPages = Math.ceil(payments.length / paymentsPerPage);


  useEffect(()=>{
 const checkSize = () => {
    setIsSmall(window.innerWidth <= 916);
  };

  checkSize();

  window.addEventListener("resize", checkSize);

  return () => window.removeEventListener("resize", checkSize);
  },[])

  return (
    <div className="payment-history">
      <h1>Payment History</h1>

      <p className="page-subtitle">
        View and manage all your payment transactions.
      </p>

      <div className="history-filters">
        <input
          type="text"
        placeholder={
    isSmall 
      ? "Search..." 
      : "Search by payment ID or customer name"
  }
          onChange={(e) => {
            search(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          onChange={(e) => {
            filter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <button className="export-btn" onClick={exportCSV}>
          {" "}
          <FaDownload />
          {"  "}
          <span className="exportcsv">Export CSV</span>
        </button>{" "}
      </div>

      <div className="history-card">
        <div className="table-wrapper">

        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              currentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>

                  <td>{payment.customer}</td>

                  <td>
                    {payment.currency} {payment.amount}
                  </td>

                  <td>{payment.paymentMethod}</td>

                  <td>
                    <span
                      className={`status-badge ${payment.status.toLowerCase()}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td>{payment.date}</td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
</div>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
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
                <span>Order ID</span>
                <strong>{selectedPayment.orderId}</strong>
              </div>

              <div>
                <span>Description</span>
                <strong
                  className={!selectedPayment.description ? "empty-text" : ""}
                >
                  {selectedPayment.description || "No description"}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong
                  className={
                    selectedPayment.status === "Success"
                      ? "success-badge"
                      : selectedPayment.status === "Pending"
                        ? "pending-badge"
                        : "failed-badge"
                  }
                >
                  {selectedPayment.status}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{selectedPayment.date}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="close-btn"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  deletePayment(selectedPayment.id);
                  setSelectedPayment(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
