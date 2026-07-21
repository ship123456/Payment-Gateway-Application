const STORAGE_KEY = "supportTickets";
const defaultTickets = [
  {
    id: "TKT-1001",
    subject: "Payment Failed",
    category: "Payment",
    priority: "High",
    status: "In Progress",
    description: "Payment failed after successful UPI authorization.",
    assignedTo: "Support Team",
    created: "2026-06-28",
  },
  {
    id: "TKT-1002",
    subject: "Refund Request",
    category: "Billing",
    priority: "Medium",
    status: "Resolved",
    description: "Refund requested for duplicate payment.",
    assignedTo: "Billing Team",
    created: "2026-06-27",
  },
];

const getTickets = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const createTicket = (ticket) => {
  const tickets = getTickets();

  const newTicket = {
    ...ticket,
    id: `TKT-${Date.now()}`,
    status: "Open",
    assignedTo: "Support Team",
    created: new Date().toISOString().split("T")[0],
  };

  tickets.unshift(newTicket);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));

  return newTicket;
};

const deleteTicket = (id) => {
  const tickets = getTickets();

  const updated = tickets.filter((ticket) => ticket.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
};
const searchTickets = (query) => {
  const search = query.toLowerCase();

  return getTickets().filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(search) ||
      ticket.id.toLowerCase().includes(search),
  );
};
const filterTickets = (status) => {
  if (!status || status === "All Status") {
    return getTickets();
  }

  return getTickets().filter((ticket) => ticket.status === status);
};
export { getTickets, createTicket, deleteTicket, searchTickets, filterTickets };
