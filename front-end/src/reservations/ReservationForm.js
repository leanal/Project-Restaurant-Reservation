// import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
// import { createReservation, updateReservation } from "../utils/api";

export default function ReservationForm({
    submitClickHandler,
    setFirstName,
    setLastName,
    setMobileNumber,
    setParty,
    setDate,
    setTime,
    firstName,
    lastName,
    mobileNumber,
    party,
    date,
    time,
    error
}) {
    
  const history = useHistory();

  const firstNameChangeHandler = (event) => setFirstName(event.target.value);
  const lastNameChangeHandler = (event) => setLastName(event.target.value);
  const mobileNumberChangeHandler = (event) =>
    setMobileNumber(event.target.value);
  const partyChangeHandler = (event) => setParty(event.target.value);
  const dateChangeHandler = (event) => setDate(event.target.value);
  const timeChangeHandler = (event) => setTime(event.target.value);

  const cancelClickHandler = () => history.goBack();

  return (
    <>
      {error && <ErrorAlert error={error} />}
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
            value={firstName}
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
            value={lastName}
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
            value={mobileNumber}
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
            value={party}
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
            value={date}
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
            value={time}
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
