import { useHistory } from "react-router-dom";
import { deleteTableReservation } from "../utils/api";

export default function FinishTable({ table_id }) {
  const history = useHistory();

  async function finishClickHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();

    /* A dialog shows up after 'Finish' button is clicked */
    const finishTable = window.confirm(
      "\nIs this table ready to seat new guests? This cannot be undone."
    );

    if (!finishTable) return history.push("/dashboard"); // goes back to dashboard after 'cancel' is clicked

    try {
      await deleteTableReservation(table_id, abortController.signal);
    } catch (error) {
      console.log(error.message);
    }

    window.location.reload();
    
    return () => abortController.abort();
  }

  return (
    <button
      type="button"
      className="btn btn-primary"
      data-table-id-finish={table_id}
      onClick={(e) => finishClickHandler(e)}
    >
      Finish
    </button>
  );
}
