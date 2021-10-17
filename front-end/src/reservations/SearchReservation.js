import { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationsList from "./ReservationsList";

export default function SearchReservation() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);

  const mobileNumberChangeHandler = (event) => setMobileNumber(event.target.value);
  async function findClickHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    // const formattedMobileNumber = formatMobileNumber()
    const data = await listReservations(
      { mobile_number: mobileNumber },
      abortController.signal
    );
    setReservations(data);

    return () => abortController.abort();
  }

//   function formatMobileNumber() {
//     let cleanMobileNumber = mobileNumber.replace(/[\s-()]/g, "").toLowerCase();
//     if (cleanMobileNumber.length > 6) {
//       return `${cleanMobileNumber.substring(
//         0,
//         3
//       )}-${cleanMobileNumber.substring(3, 6)}-${cleanMobileNumber.substring(
//         6,
//         10
//       )}`;
//     } else if (cleanMobileNumber.length > 3) {
//       return `${cleanMobileNumber.substring(
//         0,
//         3
//       )}-${cleanMobileNumber.substring(3, 6)}`;
//     } else {
//       return cleanMobileNumber;
//     }
//   }

  return (
    <div>
      <h1>Lookup a Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4>Search for a reservation using a mobile number</h4>
      </div>
      <hr></hr>
      <form className="row g-3" onSubmit={findClickHandler}>
        <div className="col-md-6">
          {/* <label htmlFor="inputMobileNumber" className="form-label">
           
          </label> */}
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            id="inputMobileNumber"
            required={true}
            placeholder="Enter a customer's phone number"
            onChange={mobileNumberChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </div>
      </form>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">
          {reservations.length > 0
            ? `Reservations for ${mobileNumber}`
            : "(No reservations found.)"}
        </h4>
      </div>
      <ReservationsList reservations={reservations} />
    </div>
  );
}
