// import { useHistory } from "react-router-dom";
// import { useState } from "react";
// import Dashboard from "../dashboard/Dashboard";
// import Dashboard from "../dashboard/Dashboard";
// import Dashboard from "../dashboard/Dashboard";
import { updateReservationStatus } from "../utils/api";

export default function CancelReservation({ reservationToCancel }) {
//   const history = useHistory();
//   const [loadDashboard, setLoadDashboard] = useState("")

  async function okClickHandler() {
    const abortController = new AbortController();
    const updatedReservation = { ...reservationToCancel, status: "cancelled" }
    try {
      await updateReservationStatus(updatedReservation, abortController.signal);
    } catch (error) {
      console.log(error.message);
    }
      // history.push(`/dashboard?date=${reservationToCancel.reservation_date}`) // does not get rid of the modal
    window.location.reload();
    // setLoadDashboard(reservationToCancel.reservation_date)
    return () => abortController.abort();
  }

//   if (loadDashboard) return <Dashboard date={loadDashboard} />

  return (
    <>
      {/* A modal pops up after 'Cancel' button is clicked */}
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
              Do you want to cancel this reservation? This cannot be undone.
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
                data-bs-dismiss="modal"
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
