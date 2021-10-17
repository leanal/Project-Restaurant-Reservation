// import { Link } from "react-router-dom"

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

  // clicking the Seat button changes the status to "seated" and hides the Seat button.
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
      <td>
        {status === "booked" && (
          <a
            className="btn btn-secondary"
            href={`/reservations/${reservation_id}/seat`}
          >
            Seat
          </a>
        )}
      </td>
      <td>
        {/* hides the 'Edit' and 'Seat' buttons when the reservation has been seated */}
        {status === "booked" && (
          <a
            className="btn btn-secondary"
            href={`/reservations/${reservation_id}/edit`}
          >
            Edit
          </a>
        )}
      </td>
      <td>
        {status === "booked" && (
          <a
            className="btn btn-secondary"
            href={`/reservations/${reservation_id}/edit`}
            data-reservation-id-cancel={reservation_id}
          >
            Cancel
          </a>
        )}
      </td>
    </tr>
  );
}
