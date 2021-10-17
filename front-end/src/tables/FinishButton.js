import { useHistory } from "react-router-dom";
import { deleteTableReservation } from "../utils/api";

export default function FinishTable({ reservation_id, table_id }) {
  const history = useHistory()

  async function okClickHandler() {
    const abortController = new AbortController();
    try {
      await deleteTableReservation(table_id, abortController.signal);
    } catch (error) {
      console.log(error.message)
    }
    // history.push("/dashboard")
    window.location.reload();
    return () => abortController.abort();
  }

  return (
    <>
      {/* {reservation_id ? <td><a className="btn btn-secondary" href={`/tables/${table_id}/seat`} data-table-id-finish={table.table_id} >Finish</a></td> : <td></td>} */}
      {/* shows the 'Finish' button if the table is occupied */}
      {reservation_id ? (
        <td>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            data-table-id-finish={table_id}
          >
            Finish
          </button>
        </td>
      ) : (
        <td></td>
      )}
      {/* A modal pops up after 'Finish' button is clicked */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
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
