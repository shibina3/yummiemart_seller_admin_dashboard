import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import "./styles.css";

const StaffActivityLogs = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        image: "https://gravatar.com/avatar/d45a568c443a1aee6e81d4cd9e968189?s=400&d=robohash&r=x",
        name: "Jane Smith",
        role: "Team Lead",
        activity: "Reviewed Project A",
        status: "Completed",
        timestamp: "15/01/25 10:45 AM",
      },
      {
        id: 2,
        image: "https://gravatar.com/avatar/d45a568c443a1aee6e81d4cd9e968189?s=400&d=robohash&r=x",
        name: "John Doe",
        role: "Developer",
        activity: "Fixed Bug #123",
        status: "In Progress",
        timestamp: "15/01/25 11:30 AM",
      },
      {
        id: 3,
        image: "https://gravatar.com/avatar/d45a568c443a1aee6e81d4cd9e968189?s=400&d=robohash&r=x",
        name: "Alice Johnson",
        role: "Tester",
        activity: "Tested Feature B",
        status: "Pending",
        timestamp: "15/01/25 12:15 PM",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "name",
        Cell: ({ row }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={row.original.image}
              alt={row.original.name}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div>
              <strong>{row.original.name}</strong>
              <p style={{ fontSize: "12px", margin: 0 }}>{row.original.role}</p>
            </div>
          </div>
        ),
      },
      { Header: "Activity", accessor: "activity" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: value === "Completed" ? "#28a745" : value === "In Progress" ? "#ffc107" : "#dc3545",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {value}
          </span>
        ),
      },
      { Header: "Timestamp", accessor: "timestamp" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable({ columns, data }, usePagination);

  return (
    <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px", height: "calc(100% - 40px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
        <h2>Staff Activity Logs</h2>
        <button
          style={{
            padding: "10px 15px",
            background: "#0856AF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Add Staff Activity
        </button>
      </div>
      <table
        {...getTableProps()}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    textAlign: "left",
                    padding: "10px 15px",
                    background: "#f1f1f1",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: "1px solid #ddd" }}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px 15px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StaffActivityLogs;
