import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TablesList";
import TodayPrevNextButtons from "./TodayPrevNextButtons";
import BackAndForwardButtons from "../layout/BackAndForwardButtons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);
  const query = useQuery();
  const dateQuery = query.get("date");

  if (dateQuery) date = dateQuery;

  /**
   * Get request of an array of `reservations` with `date` query
   */
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
  }, [date]);

  /**
   * Get request of all `tables`
   */
  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      setReservationsError(null);
      try {
        const data = await listTables(abortController.signal);
        setTables(data);
      } catch (error) {
        setTablesError(error);
      }
    }

    loadTables();

    return () => abortController.abort();
  }, []);

  // filters `reservations` with statuses "booked" and "seated"
  const unfinishedReservations = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );

  return (
    <main>
      <BackAndForwardButtons />
      <h1 className="my-3">Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">
          {reservations.length < 1 && "No "}
          {`Reservations for`}&nbsp;
        </h4>
        <h4 className="fw-bold">{date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <TodayPrevNextButtons date={date} />
      <ReservationsList reservations={unfinishedReservations} />
      <br></br>
      <hr></hr>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">List of Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <TablesList tables={tables} />
    </main>
  );
}

export default Dashboard;
