import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./SupportTickets.css";
import { getTickets, deleteTicket } from "../../services/supportService";

function SupportTickets() {
  const [tickets, setTickets] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const ticketsPerPage = 5;

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All Status" || ticket.status === status;

    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * ticketsPerPage;

  const indexOfFirst = indexOfLast - ticketsPerPage;

  const currentTickets = filteredTickets.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handleDelete = (id) => {
    deleteTicket(id);

    setTickets(getTickets());

    setSelectedTicket(null);

    toast.success("Ticket deleted successfully!");
  };

  return (
    <div className="support-tickets">
      <h1>My Support Tickets</h1>
      <p className="page-subtitle">
        Track and manage your submitted support requests.
      </p>

      <div className="ticket-filters">
        <input
          type="text"
          placeholder="Search Ticket ID or Subject..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          {" "}
          <option>All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="ticket-card">
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.priority}</td>
                <td>
                  <span
                    className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.created}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
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

      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
            {" "}
            <div className="modal-header">
              <h2>Support Ticket</h2>

              <button onClick={() => setSelectedTicket(null)}>×</button>
            </div>
            <div className="modal-details">
              <div>
                <span>Ticket ID</span>
                <strong>{selectedTicket.id}</strong>
              </div>

              <div>
                <span>Subject</span>
                <strong>{selectedTicket.subject}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{selectedTicket.category}</strong>
              </div>

              <div>
                <span>Priority</span>
                <strong>{selectedTicket.priority}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedTicket.status}</strong>
              </div>

              <div>
                <span>Created On</span>
                <strong>{selectedTicket.created}</strong>
              </div>

              <div>
                <span>Description</span>
                <strong>{selectedTicket.description}</strong>
              </div>

              <div>
                <span>Assigned To</span>
                <strong>{selectedTicket.assignedTo}</strong>
              </div>

              <div>
                <span>Attachment</span>
                <strong>
                  {selectedTicket.screenshot
                    ? selectedTicket.screenshot
                    : "No Attachment"}
                </strong>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              <button
                className="secondary-btn"
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>

              <button
                className="primary-btn"
                onClick={() => handleDelete(selectedTicket.id)}
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

export default SupportTickets;
