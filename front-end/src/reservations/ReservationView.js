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
        status
    } = reservation

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
          {/* hides the 'Seat' button when the reservation has been seated */}
          {status === "booked" ? <td><a className="btn btn-secondary" href={`/reservations/${reservation_id}/seat`} >Seat</a></td> : <td></td>}
        </tr>
      )
}