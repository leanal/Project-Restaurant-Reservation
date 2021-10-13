import { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
// import Dashboard from "../dashboard/Dashboard";

export default function NewReservation() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [people, setPeople] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const firstNameChangeHandler = (event) => setFirstName(event.target.value);
  const lastNameChangeHandler = (event) => setLastName(event.target.value);
  const mobileNumberChangeHandler = (event) =>
    setMobileNumber(event.target.value);
  const peopleChangeHandler = (event) => setPeople(event.target.value);
  const dateChangeHandler = (event) => setDate(event.target.value)
  const timeChangeHandler = (event) => setTime(event.target.value);

  const cancelClickHandler = () => history.goBack();

  async function submitClickHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const formattedDate = `${date.substring(4, 8)}-${date.substring(0, 2)}-${date.substring(2, 4)}`
    const formattedTime = `${time.substring(0, 2)}:${time.substring(2, 4)}`
    const newReservation = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      reservation_date: formattedDate,
      reservation_time: formattedTime,
      people: Number(people),
    };
    try {
    await createReservation(newReservation, abortController.signal);
    } catch (error) {
        return <div className="alert alert-danger">{window.alert(error.message)}</div>
    }
    const dashboard = date ? `/dashboard?date=${formattedDate}` : "/dashboard";
    history.push(dashboard);
  }
  
  return (
    <div>
      <h1>New Reservation</h1>
      <hr></hr>
      <div className="d-md-flex mb-3">
        <h4>Complete all fields to create a new reservation</h4>
      </div>
      <form className="row g-3" onSubmit={submitClickHandler}>
        <div className="col-md-6">
          <label for="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            name="first_name"
            type="text"
            className="form-control"
            id="inputFirstName"
            required={true}
            onChange={firstNameChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label for="inputLastName" className="form-label">
            Last Name
          </label>
          <input
            name="last_name"
            type="text"
            className="form-control"
            id="inputLastName"
            required={true}
            onChange={lastNameChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label for="inputMobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            id="inputMobileNumber"
            placeholder="xxx-xx-xxxx"
            required={true}
            onChange={mobileNumberChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label for="inputParty" className="form-label">
            # of Party
          </label>
          <input
            name="people"
            type="text"
            className="form-control"
            id="inputParty"
            placeholder="Enter a number"
            required={true}
            onChange={peopleChangeHandler}
          ></input>
        </div>
        {/* <div className="col-md-6">
          <label for="inputParty" className="form-label">
            Party of
          </label>
          <input
            type="number"
            className="form-control"
            id="inputParty"
          ></input>
        </div> */}
        <div className="col-md-6">
          <label for="inputDate" className="form-label">
            Date
          </label>
          <input
            name="reservation_date"
            type="text"
            className="form-control"
            id="inputDate"
            placeholder="MMDDYYYY"
            required={true}
            onChange={dateChangeHandler}
            value={date}
          ></input>
        </div>
        <div className="col-md-6">
          <label for="inputTime" className="form-label">
            Time
          </label>
          <input
            name="reservation_time"
            type="text"
            className="form-control"
            id="inputTime"
            placeholder="Ex. 14:00"
            required={true}
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
    </div>
  );
}
