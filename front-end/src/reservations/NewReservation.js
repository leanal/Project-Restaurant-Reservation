import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api"
import ReservationForm from "./ReservationForm";

export default function NewReservation() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [party, setParty] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  async function submitClickHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const formattedDate = formatDate();
    const formattedTime = formatTime();
    const newReservation = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      reservation_date: formattedDate,
      reservation_time: formattedTime,
      people: Number(party),
    };
    try {
      await createReservation(newReservation, abortController.signal);
    } catch (error) {
      setError(error);
      return;
    }

    history.push(`/dashboard?date=${formattedDate}`);
    return () => abortController.abort();
  }

  function formatDate() {
    return `${date.substring(4, 8)}-${date.substring(0, 2)}-${date.substring(
      2,
      4
    )}`;
  }
  // reformat possible input that includes `pm`
  function formatTime() {
    let cleanTime = time.replace(/[\s:]/g, "").toLowerCase();
    if (cleanTime.includes("pm")) {
      cleanTime = Number(cleanTime.slice(0, 4)) + 1200;
      cleanTime = String(cleanTime);
    }
    return `${cleanTime.slice(0, 2)}:${cleanTime.slice(2, 4)}`;
  }

  return (
    <div>
      <h1>New Reservation</h1>
      <div className="d-md-flex mb-3">
        <h4>Complete all fields to create a new reservation</h4>
      </div>
      <hr></hr>
      <ReservationForm
        submitClickHandler={submitClickHandler}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setMobileNumber={setMobileNumber}
        setParty={setParty}
        setDate={setDate}
        setTime={setTime}
        firstName={firstName}
        lastName={lastName}
        mobileNumber={mobileNumber}
        party={party}
        date={date}
        time={time}
        error={error}
        />
    </div>
  );
}
