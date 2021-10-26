import { useHistory } from "react-router-dom";

export default function BackAndForwardButtons() {
  const history = useHistory();
  return (
    <nav className="mt-3" aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" type="button"  onClick={() => history.goBack()}>
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" type="button" onClick={() => history.goForward()}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
