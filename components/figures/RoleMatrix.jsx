// Tabular data, so a table rather than an SVG.
const ROWS = [
  ['Sales, quotations, customers, repayments', true, true, true],
  ['Cost prices, purchases, voiding, expenses', true, true, false],
  ['Salary, shareholders, users, settings', true, false, false],
];

export default function RoleMatrix() {
  return (
    <table className="matrix">
      <caption className="visually-hidden">
        What each role can do. Permission is re-checked on the server for every request and every save.
      </caption>
      <thead>
        <tr>
          <th scope="col">Can do</th>
          <th scope="col">Owner</th>
          <th scope="col">Manager</th>
          <th scope="col">Staff</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map(([label, ...cells]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            {cells.map((allowed, i) => (
              <td key={i} data-allowed={allowed ? 'yes' : 'no'}>
                <span aria-hidden="true">{allowed ? '●' : '—'}</span>
                <span className="visually-hidden">{allowed ? 'Allowed' : 'Not allowed'}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
