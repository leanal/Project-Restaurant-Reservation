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
  "reservation_id",
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "created_at",
  "updated_at"
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

  if (reservationNotInTheFuture(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message: `Please enter a future reservation date.`,
    });
  }

  if (reservationTimeNotAllowed(reservation_time)) {
    return next({
      status: 400,
      message: `Please enter a time between 10:30 to 21:30.`,
    });
  }
  return next();
}

// checks if the reservation_date is a valid Date
function reservationDateIsValid(reservation_date) {
  const timestamp = Date.parse(reservation_date);
  if (isNaN(timestamp) == false) {
    const date = new Date(timestamp);
    return date instanceof Date
  }
}

function reservationTimeIsValid(reservation_time) {
  const isTime = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  console.log(reservation_time, isTime);
  return isTime
}

// checks if the reservation_date is a Tuesday
function reservationDateIsTuesday(reservation_date) {
  const timestamp = Date.parse(`${reservation_date} PST`);
  const date = new Date(timestamp);
  return date.getDay() == 2
}

// checks if the reservation is after the current time and date
function reservationNotInTheFuture(reservation_date, reservation_time) {
  const reservationDateTimestamp = Date.parse(
    `${reservation_date} ${reservation_time} PST`
  );
  return reservationDateTimestamp < Date.now();
}

// checks if the reservation time is NOT between 10:30 and 21:30
function reservationTimeNotAllowed(reservation_time) {
  const reservationTime = Number(reservation_time.replace(":", "").slice(0, 4));
  return reservationTime < 1030 || reservationTime > 2130
}

// creates a new reservation adding 'status' key with default value "booked"
async function create(req, res) {
  const { data } = req.body
  const newReservation = { ...data, status: "booked" }
  const newData = await reservationsService.create(newReservation);
  res.status(201).json({ data: newData });
}

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await reservationsService.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID ${reservationId} cannot be found.`,
  });
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
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
 * List handler for reservation resources with optional date or mobile_number query
 */
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let data = [];

  if (date) {
    data = await reservationsService.listByDate(date);
  } else if (mobile_number) {
    data = await reservationsService.listByMobileNumber(mobile_number);
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
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    asyncErrorBoundary(reservationExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidInputs,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
};
