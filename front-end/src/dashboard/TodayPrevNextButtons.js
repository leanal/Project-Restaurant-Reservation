import { Link, useHistory } from "react-router-dom";
import { today } from "../utils/date-time";
import { previous, next } from "../utils/date-time";

/**
 * Buttons that takes the user to the previous date, next date and today's date.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function TodayPrevNextButtons({ date }) {
    const history = useHistory()

    return (
        <div className="row my-3">
          <button
            type="button"
            className="btn btn-secondary col mx-3"
            onClick={() => {
              const previousDate = previous(date);
              history.push(`/dashboard?date=${previousDate}`)
            }}
          >
            {"<< Previous Day"}
          </button>
          <Link className="btn btn-secondary col" to={`/dashboard?date=${today()}`} >
            Today
          </Link>
          <button
            type="button"
            className="btn btn-secondary col mx-3"
            onClick={() => {
              const nextDate = next(date);
              history.push(`/dashboard?date=${nextDate}`)
            }}
          >
            {"Next Day >>"}
          </button>
        </div>
        )
}