import React from "react";

import { Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import SeatReservation from "../reservations/SeatReservation";
import NewReservation from "../reservations/NewReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      {/* <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route> */}
      {/* <Route exact={true} path="/reservations">
        <Reservations />
        <Redirect to={"/dashboard"} />
      </Route> */}
      <Route path={`/dashboard`}>
        <Dashboard date={today()} />
        {console.log("today", today())}
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
