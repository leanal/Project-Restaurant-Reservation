// if the table capacity is less than the number of people in the reservation, return 400 with an error message.
// if the table is occupied, return 400 with an error message.
// Send a DELETE request to /tables/:table_id/seat in order to remove the table assignment.
// The tests do not check the body returned by this request. - The server should return 400 if the table is not occupied.
const tablesService = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["table_name", "capacity"];

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

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data: data });
}

// async function tableExists(req, res, next) {
//   const table = await tablesService.read(req.params.tableId);
//   if (table) {
//     res.locals.table = table;
//     next();
//   }
// }

// async function read(req, res) {
//   const data = res.locals.table;
//   res.json({ data: data });
// }

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  list: [asyncErrorBoundary(list)],
//   read: [tableExists, asyncErrorBoundary(read)],
};
