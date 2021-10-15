

// default status is "booked"
// status text must have a data-reservation-id-status={reservation.reservation_id} attribute, so it can be found by the tests.

// display the Seat button only when the reservation status is "booked".
// clicking the Seat button changes the status to "seated" and hides the Seat button.
// clicking the Finish button associated with the table changes the reservation status to "finished" and removes the reservation from the dashboard.
import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api"
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time"
import ReservationsList from "./ReservationsList";

export default function Reservations() {
    const [ reservations, setReservations ] = useState([])
    const query = useQuery();
    let date = query.get("date")

    if (!date) date = today()

    useEffect(() => {
        const abortController = new AbortController();

        async function loadReservations() {
            const data = await listReservations({ date: date }, abortController.signal)
            setReservations(data)
        }

        loadReservations()
        
        return () => abortController.abort();
    }, [date])
    
    return <ReservationsList reservations={reservations} />
}