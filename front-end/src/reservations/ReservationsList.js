import { useState } from "react";
import ReservationView from "./ReservationView";
import CancelReservation from "./CancelReservation";

export default function ReservationsList({ reservations = [], setReservationToCancel, reservationToCancel }) {
  // const [reservationToCancel, setReservationToCancel] = useState({})
  return (
    <>
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Guest Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col"># of People</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => <ReservationView reservation={reservation} key={reservation.reservation_id} setReservationToCancel={setReservationToCancel} />)}
      </tbody>
    </table>
    
      {/* A modal pops up after 'Cancel' button is clicked */}
      <CancelReservation reservationToCancel={reservationToCancel} />
    </>
  );
}
