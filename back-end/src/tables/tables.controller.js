// if the table capacity is less than the number of people in the reservation, return 400 with an error message.
// if the table is occupied, return 400 with an error message.
// Send a DELETE request to /tables/:table_id/seat in order to remove the table assignment.
// The tests do not check the body returned by this request. - The server should return 400 if the table is not occupied.
const tablesService = require("./tables.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["table_name", "capacity"];
/**
 * Validates the request properties
 * @param req
 * @returns {<Error>}
 * If the request body has an invalid property, returns 400 and the invalid field(s)
 */
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

function hasValidInputs(req, res, next) {
  const { table_name, capacity } = req.body.data
  let invalidInputs = "Invalid input(s):";

  if (table_name.length < 2) {
    invalidInputs = invalidInputs.concat(" table_name");
    // return next({
    //   status: 400,
    //   message: `"table_name" must have more than two characters.`,
    // });
  }
  
  if (typeof capacity !== "number"){
    invalidInputs = invalidInputs.concat(" capacity");
  }
  
  if (invalidInputs !== "Invalid input(s):") {
    return next({
      status: 400,
      message: invalidInputs,
    });
  }

  next()
}

// creates a new 'table' with a reservation_id property
async function create(req, res) {
  // const { table_name, capacity } = req.body.data
  // console.log(req.body.data);
  // const newTable = {...req.body.data, reservation_id: null }
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data: data });
}

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.tableId);
  if (table) {
    res.locals.table = table;
    next();
  }
}


async function update(req, res) {
    const updatedTable = {
      ...req.body.data,
      table_id: res.locals.table.table_id,
    };
    const data = await tablesService.update(updatedTable);
    res.json({ data });
  }

async function read(req, res) {
  const data = res.locals.table;
  res.json({ data: data });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidInputs,
    asyncErrorBoundary(create),
  ],
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
};
