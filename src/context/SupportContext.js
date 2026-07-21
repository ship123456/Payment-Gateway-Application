import { createContext, useContext, useEffect, useState } from "react";

import {
  getTickets,
  createTicket as addTicket,
  deleteTicket as removeTicket,
  searchTickets,
  filterTickets,
} from "../services/supportService";

export const SupportContext = createContext();

export const SupportProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const refreshTickets = () => {
    setTickets(getTickets());
  };

  useEffect(() => {
    refreshTickets();
  }, []);

  const createTicket = (ticket) => {
    addTicket(ticket);
    refreshTickets();
  };

  const deleteTicket = (id) => {
    removeTicket(id);
    refreshTickets();
  };

  const search = (query) => {
    setTickets(searchTickets(query));
  };

  const filter = (status) => {
    setTickets(filterTickets(status));
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        createTicket,
        deleteTicket,
        search,
        filter,
        refreshTickets,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => useContext(SupportContext);
