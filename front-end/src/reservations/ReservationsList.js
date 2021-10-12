import ReservationView from "./ReservationView";

export default function ReservationsList({ reservations = [] }) {
  return (
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
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => <ReservationView reservation={reservation} key={reservation.reservation_id} />)}
      </tbody>
    </table>
  );
}
