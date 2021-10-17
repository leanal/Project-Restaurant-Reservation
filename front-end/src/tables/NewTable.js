import { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";

export default function NewTable() {
  const history = useHistory();
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  
  const tableNameChangeHandler = (event) => setTableName(event.target.value);
  const capacityChangeHandler = (event) => setCapacity(event.target.value);
  const cancelClickHandler = () => history.goBack();

  async function submitClickHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const newTable = {
      table_name: tableName,
      capacity: Number(capacity),
    };

    try {
      await createTable(newTable, abortController.signal);
    } catch (error) {
      setErrorMessage(error.message);
      return;
    }

    history.push(`/dashboard`);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>New Table</h1>
      <div className="d-md-flex mb-3">
        <h4>Complete all fields to create a new table</h4>
      </div>
      <hr></hr>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form className="row g-3" onSubmit={submitClickHandler}>
        <div className="col-md-6">
          <label htmlFor="inputTableName" className="form-label">
            Table Name
          </label>
          <input
            name="table_name"
            type="text"
            className="form-control"
            id="inputTableName"
            required={true}
            onChange={tableNameChangeHandler}
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCapacity" className="form-label">
            Capacity
          </label>
          <input
            name="capacity"
            type="text"
            className="form-control"
            id="inputCapacity"
            required={true}
            onChange={capacityChangeHandler}
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
