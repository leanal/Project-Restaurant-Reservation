const reservationsService = require("./reservations.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { NotificationCenter } = require("node-notifier");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

// 400! The reservation date is in the past. Only future reservations are allowed. time & date
// Hint Parsing a Date that includes the time in JavaScript can be tricky. Again, keep an eye out for which time zone is being used for your Dates.
// { status: 404, message: `The reservation time cannot be before 10:30 AM.` }
// { status: 400, message: `The reservation time is after 9:30 PM. Restaurant closes at 10:30 PM` }
// { status: 400, message: `` }
//PUT to /reservations/:reservation_id/status with a body of {data: { status: "<new-status>" } } where <new-status> is one of booked, seated, or finished

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

/**
 * Validates input for people,
 * @param { body.data } req
 * @param {*} next
 * @returns property names of the invalid inputs
 */
function hasValidInputs(req, res, next) {
  const { people, reservation_date, reservation_time } = req.body.data;
  let invalidInputs = "Invalid input(s):";

  if (typeof people !== "number") {
    invalidInputs = invalidInputs.concat(" people");
  }
  if (!reservationDateIsValid(reservation_date)) {
    invalidInputs = invalidInputs.concat(" reservation_date");
  }

  if (!reservationTimeIsValid(reservation_time)) {
    invalidInputs = invalidInputs.concat(" reservation_time");
  }

  if (invalidInputs !== "Invalid input(s):") {
    return next({
      status: 400,
      message: invalidInputs,
    });
  }

  if (reservationDateIsTuesday(reservation_date)) {
    return next({
      status: 400,
      message: `The restaurant is closed on Tuesdays.`,
    });
  }

  if (!reservationDateIsInTheFuture(reservation_date)) {
    return next({
      status: 400,
      message: `Please enter a future reservation date.`,
    });
  }
  return next();
}

// checks if the reservation_date is a valid Date
function reservationDateIsValid(reservation_date) {
  const timestamp = Date.parse(reservation_date);
  if (isNaN(timestamp) == false) {
    const date = new Date(timestamp);
    return date instanceof Date ? true : false;
  }
}

function reservationTimeIsValid(reservation_time) {
  const isTime = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  return isTime ? true : false;
}

// checks if the reservation_date is a Tuesday
function reservationDateIsTuesday(reservation_date) {
  const timestamp = Date.parse(`${reservation_date} PST`);
  const date = new Date(timestamp);
  return date.getDay() == 2 ? true : false;
}

function reservationDateIsInTheFuture(reservation_date) {
  const reservationDateTimestamp = Date.parse(`${reservation_date} PST`);
  return reservationDateTimestamp > Date.now()
}
async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `reservation cannot be found.` });
}

async function update(req, res) {
  const updatedreservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.update(updatedreservation);
  res.json({ data });
}

async function destroy(req, res) {
  const { reservation } = res.locals;
  await reservationsService.delete(reservation.reservation_id);
  res.sendStatus(204);
}

/**
 * List handler for reservation resources specific to date query
 */
async function list(req, res) {
  const { date } = req.query;
  let data = [];

  if (date) {
    data = await reservationsService.listByDate(date);
  } else {
    data = await reservationsService.list();
  }

  res.json({
    data: data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidInputs,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
};
