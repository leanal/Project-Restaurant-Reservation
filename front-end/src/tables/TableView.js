import FinishButton from "./FinishButton";

export default function TableView({ table }) {
  const { table_id, table_name, capacity, reservation_id } = table;

  return (
    <tr key={table_id}>
      <th scope="row">{table_id}</th>
      <td>{table_name}</td>
      <td>{capacity}</td>

      <td data-table-id-status={table_id}>
        {reservation_id ? "occupied" : "free"}
      </td>

      {/* shows the 'Finish' button if the table is occupied */}
      <td>{reservation_id && <FinishButton table_id={table_id} />}</td>
    </tr>
  );
}
