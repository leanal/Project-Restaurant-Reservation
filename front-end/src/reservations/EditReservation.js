import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function EditReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservation() {
        try {
      const data = await readReservation(
        reservation_id,
        abortController.signal
      );
      setReservation(data);
        } catch (error) {
            
        }
    }

    loadReservation();

    return () => abortController.abort();
  }, [reservation_id]);

  return (
    <div>
      <h1>Edit Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4>Complete all fields to edit a new reservation</h4>
      </div>
      <hr></hr>
      {/* <ReservationForm
        first_name={first_name}
        last_name={last_name}
        mobile_number={mobile_number}
        reservation_date={reservation_date}
        reservation_time={reservation_time}
      /> */}
    </div>
  );
}
