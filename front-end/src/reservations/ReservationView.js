import CancelReservation from "./CancelReservation";

export default function ReservationView({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;

  return (
    <tr>
      <th scope="row">{reservation_id}</th>
      <td>
        {first_name} {last_name}
      </td>
      <td>{mobile_number}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>{status}</td>

      {/* shows the 'Edit', 'Seat' and 'Cancel' buttons ONLY if the reservation status is "booked" */}
      {status === "booked" ? (
        <>
          <td>
            <a
              className="btn btn-primary"
              href={`/reservations/${reservation_id}/seat`}
            >
              Seat
            </a>
          </td>
          <td>
            <a
              className="btn btn-secondary"
              href={`/reservations/${reservation_id}/edit`}
            >
              Edit
            </a>
          </td>
          <td>
            {/* returns the 'Cancel' button */}
            <CancelReservation reservation={reservation} />
          </td>
        </>
      ) : (
        <>
          <td></td>
          <td></td>
          <td></td>
        </>
      )}
    </tr>
  );
}
