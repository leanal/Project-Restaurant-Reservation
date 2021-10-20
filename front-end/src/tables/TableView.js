// Display a "Finish" button on each occupied table. button must have a data-table-id-finish={table.table_id} attribute
// finish onClick "Is this table ready to seat new guests? This cannot be undone."
//PUT to /tables/:table_id/status with a body of {data: { status: "<new-status>" } } where <new-status> is one of booked, seated, or finished
// DELETE request to /tables/:table_id/seat, Refresh the list of tables to show that the table is now available
// clicking the Finish button associated with the table changes the table status to "finished" and removes the table from the dashboard.
// he end-to-end test waits for the tables list to be refreshed before checking the free/occupied status of the table,
// so be sure to send a GET request to /tables to refresh the tables list after delete

// import FinishButton from "./FinishButton";
// import { useHistory } from "react-router-dom";
// import { deleteTableReservation } from "../utils/api";

// clicking the Finish button associated with the table changes the reservation status to "finished" and removes the reservation from the dashboard.
export default function TableView({ table, setTableToFinish, okClickHandler }) {
  const { table_id, table_name, capacity, reservation_id } = table;

  // async function okClickHandler() {
  //   const abortController = new AbortController();
  //   try {
  //     await deleteTableReservation(table_id, abortController.signal);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   // history.push("/dashboard")
  //   window.location.reload();
  //   return () => abortController.abort();
  // }
  return (
    <>
      <tr>
        <th scope="row">{table_id}</th>
        <td>{table_name}</td>
        <td>{capacity}</td>
        <td data-table-id-status={table_id}>
          {reservation_id ? "occupied" : "free"}
        </td>
        {/* <FinishButton reservation_id={reservation_id} table_id={table_id} /> */}

        {/* {reservation_id ? <td><a className="btn btn-secondary" href={`/tables/${table_id}/seat`} data-table-id-finish={table.table_id} >Finish</a></td> : <td></td>} */}
        {/* shows the 'Finish' button if the table is occupied */}
        <td>
          {reservation_id && (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#finish"
              data-table-id-finish={table_id}
              onClick={() => setTableToFinish(table_id)}
            >
              Finish
            </button>
          )}
        </td>
      </tr>
    </>
  );
}
