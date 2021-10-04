export default function ReservationsList({ reservations = [] }) {
  return (
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Guest Name</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col"># of People</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <tr>
            <th scope="row">{reservation.reservation_id}</th>
            <td>
              {reservation.first_name} {reservation.last_name}
            </td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
