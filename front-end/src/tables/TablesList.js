import { useState } from "react";
import TableView from "./TableView";
import { deleteTableReservation, listTables } from "../utils/api";
import FinishTable from "./FinishTable";
import { useHistory } from "react-router";

export default function TablesList({ tables, setTableToFinish, tableToFinish }) {
  // const [tableToFinish, setTableToFinish] = useState(0);
  const history = useHistory()

  async function okClickHandler() {
    const abortController = new AbortController();
    try {
      await deleteTableReservation(tableToFinish, abortController.signal);
      // await listTables(abortController.signal);
    } catch (error) {
      console.log(error.message);
    }
    // history.push("/dashboard")
    window.location.reload();
    return () => abortController.abort();
  }
  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Capacity</th>
            <th scope="col">Availability</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!tables && "No available tables."}
          {tables.map((table) => (
            <TableView
              table={table}
              key={table.table_id}
              setTableToFinish={setTableToFinish}
            />
          ))}
        </tbody>
      </table>

      {/* A modal pops up after 'Finish' button is clicked */}
      {/* <FinishTable tableToFinish={tableToFinish} /> */}
      <div
        className="modal fade"
        id="finish"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="finishLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="finishLabel">
                Seat new guests
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Is this table ready to seat new guests? This cannot be undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                // data-bs-dismiss="modal"
                // data-bs-target="/tables/new"
                onClick={okClickHandler}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
