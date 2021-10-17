import { useState } from "react";
import ReservationForm from "./ReservationForm";

export default function NewReservation() {


  return (
    <div>
      <h1>New Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4>Complete all fields to create a new reservation</h4>
      </div>
      <hr></hr>
      <ReservationForm />
    </div>
  );
}
