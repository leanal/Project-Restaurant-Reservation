// import { useHistory } from "react-router-dom";
// import Dashboard from "../dashboard/Dashboard";
import { deleteTableReservation } from "../utils/api";

export default function FinishTable({ tableToFinish }) {
  // const history = useHistory();

  async function okClickHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    console.log(tableToFinish);
    try {
      await deleteTableReservation(tableToFinish, abortController.signal);
    } catch (error) {
      console.log(error.message);
    }
    
    // history.push("/dashboard") // does not get rid of the modal 
    window.location.reload();
    return () => abortController.abort();
  }

  /* A modal pops up after 'Finish' button is clicked */
  return (
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
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
  );
}
