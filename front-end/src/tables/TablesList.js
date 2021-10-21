import TableView from "./TableView";

/**
 * A table that lists the `tables`
 * @param tables
 *  an array of tables
 * @returns {JSX.Element}
 */
export default function TablesList({ tables = [] }) {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Capacity</th>
          <th scope="col">Availability</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {!tables && "No available tables."}
        {tables.map((table) => (
          <TableView key={table.table_id} table={table} />
        ))}
      </tbody>
    </table>
  );
}
