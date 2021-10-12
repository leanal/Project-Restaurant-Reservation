import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readReservation,
  updateReservation,
  listTables,
  updateTable,
} from "../utils/api";

export default function SeatReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      const data = await listTables(abortController.signal);
      setTables(data);
    }

    loadTables();

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservation() {
      const data = await readReservation(
        reservation_id,
        abortController.signal
      );
      setReservation(data);
    }

    loadReservation();

    return () => abortController.abort();
  }, [reservation_id]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    console.log(tableId);
    const updatedTable = {
        table_id: tableId,
      reservation_id: reservation.reservation_id,
    };
    await updateTable(updatedTable, abortController.signal);
    history.push("/dashboard")
    return () => abortController.abort();
  };

  console.log(reservation);
  console.log("tableId",tableId);
  // filter tables without existing reservation and with capacity that could seat reservation.people
  const filteredTables = tables.filter(
    (table) => !table.reservation_id && table.capacity >= reservation.people
  );

  // options list
  // <select name="table_id" />
  // {table.table_name} - {table.capacity}

  // submitHandler => put request "/:table_id/seat"
  //

  return (
    <>
      {/* <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Choose a table
        </button>
        <ul className="dropdown-menu">
          {filteredTables.map((table) => (
            <li
              className="dropdown-item"
              onClick={() => setTableId(table.table_id)}
            >{`${table.table_name} - ${table.capacity}`}</li>
          ))}
        </ul>
      </div> */}

      <select className="form-select" name="table_id" onChange={(e) => setTableId(e.target.value)}>
        <option selected>Choose a table</option>
          {filteredTables.map((table) => (
              <option value={table.table_id}>{`${table.table_name} - ${table.capacity}`}</option>
          ))}
      </select>
      <button className="btn btn-primary" type="button" onClick={submitHandler}>Submit</button>
    </>
  );
}
