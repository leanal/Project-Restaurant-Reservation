import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tableToFinish, setTableToFinish] = useState(0);
  const [reservationToCancel, setReservationToCancel] = useState({})
  const query = useQuery()
  const dateQuery = query.get("date");

  if (dateQuery) date = dateQuery;

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservations() {
      setReservationsError(null);
      try {
        const data = await listReservations({ date }, abortController.signal);
        setReservations(data);
      } catch (error) {
        setReservationsError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, [date, reservationToCancel]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      const data = await listTables(abortController.signal);
      setTables(data);
    }

    loadTables();

    return () => abortController.abort();
  }, [tableToFinish]);

  const unfinishedReservations = reservations.filter(reservation => reservation.status !== "finished")

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">
          {reservations.length > 0
            ? `Reservations for ${date}`
            : "(No reservations for today.)"}
        </h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationsList reservations={unfinishedReservations} reservationToCancel={reservationToCancel} setReservationToCancel={setReservationToCancel} />
      <br></br>
      <hr></hr>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">List of Tables</h4>
      </div>
      <TablesList tables={tables} setTableToFinish={setTableToFinish} tableToFinish={tableToFinish} />
    </main>
  );
}

export default Dashboard;
