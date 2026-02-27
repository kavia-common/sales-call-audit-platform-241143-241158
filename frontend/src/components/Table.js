import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
export function Table({ columns, rows, rowKey, onRowClick, emptyLabel = "No records found." }) {
  /** Table component with sticky header and optional row click behavior. */
  const keyFn = rowKey || ((r) => r.id);

  if (!rows || rows.length === 0) {
    return <div className="emptyState">{emptyLabel}</div>;
  }

  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="th" scope="col">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={keyFn(r)}
              className={onRowClick ? "trHover" : undefined}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
              onClick={onRowClick ? () => onRowClick(r) : undefined}
            >
              {columns.map((c) => (
                <td key={c.key} className="td">
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
