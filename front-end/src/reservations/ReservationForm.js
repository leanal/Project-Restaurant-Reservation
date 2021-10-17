import { useState } from "react";
import { useHistory } from "react-router";
import { createReservation, updateReservation } from "../utils/api";

export default function ReservationForm({
  first_name = "",
  last_name = "",
  mobile_number = "",
  people,
  reservation_date = "",
  reservation_time = "",
}) {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [party, setParty] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
//   const [firstName, setFirstName] = useState(first_name);
//   const [lastName, setLastName] = useState(last_name);
//   const [mobileNumber, setMobileNumber] = useState(mobile_number);
//   const [party, setParty] = useState(people);
//   const [date, setDate] = useState(reservation_date);
//   const [time, setTime] = useState(reservation_time);
  const [errorMessage, setErrorMessage] = useState("");

  const firstNameChangeHandler = (event) => setFirstName(event.target.value);
  const lastNameChangeHandler = (event) => setLastName(event.target.value);
  const mobileNumberChangeHandler = (event) =>
    setMobileNumber(event.target.value);
  const partyChangeHandler = (event) => setParty(event.target.value);
  const dateChangeHandler = (event) => setDate(event.target.value);
  const timeChangeHandler = (event) => setTime(event.target.value);

  const cancelClickHandler = () => history.goBack();

  async function submitClickHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const formattedDate = formatDate();
    const formattedTime = formatTime();
    const reservation = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      reservation_date: formattedDate,
      reservation_time: formattedTime,
      people: Number(party),
    };

    try {
      if (first_name) {
        await updateReservation(reservation, abortController.signal);
      } else {
        await createReservation(reservation, abortController.signal);
      }
    } catch (error) {
      setErrorMessage(error.message);
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
    <>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form className="row g-3" onSubmit={submitClickHandler}>
        <div className="col-md-6 form-group">
          <label htmlFor="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            name="first_name"
            type="text"
            className="form-control"
            id="inputFirstName"
            required={true}
            defaultValue={first_name}
            onChange={firstNameChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputLastName" className="form-label">
            Last Name
          </label>
          <input
            name="last_name"
            type="text"
            className="form-control"
            id="inputLastName"
            required={true}
            defaultValue={last_name}
            onChange={lastNameChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputMobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            id="inputMobileNumber"
            placeholder="xxx-xx-xxxx"
            required={true}
            defaultValue={mobile_number}
            onChange={mobileNumberChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputParty" className="form-label">
            # of Party
          </label>
          <input
            name="people"
            type="text"
            className="form-control"
            id="inputParty"
            placeholder="Enter a number"
            required={true}
            defaultValue={people}
            onChange={partyChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputDate" className="form-label">
            Date
          </label>
          <input
            name="reservation_date"
            type="text"
            className="form-control"
            id="inputDate"
            placeholder="MMDDYYYY"
            required={true}
            defaultValue={reservation_date}
            onChange={dateChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputTime" className="form-label">
            Time
          </label>
          <input
            name="reservation_time"
            type="text"
            className="form-control"
            id="inputTime"
            placeholder="Ex. 14:00"
            required={true}
            defaultValue={reservation_time}
            onChange={timeChangeHandler}
          ></input>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelClickHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
