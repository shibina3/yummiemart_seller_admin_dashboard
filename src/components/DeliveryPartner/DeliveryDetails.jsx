import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import "./styles.css"; 

const DeliveryDetails = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        image: "https://gravatar.com/avatar/d45a568c443a1aee6e81d4cd9e968189?s=400&d=robohash&r=x",
        name: "John Doe",
        title: "Full time",
        role: "Delivery Partner",
        rating: 3,
        dateCreated: "23/10/22 09:20 AM",
        dateModified: "24/10/22 09:20 AM",
      },
      {
        id: 2,
        image: "https://gravatar.com/avatar/d45a568c443a1aee6e81d4cd9e968189?s=400&d=robohash&r=x",
        name: "Michale Caine",
        title: "Part time",
        role: "Delivery Partner",
        rating: 4,
        dateCreated: "25/10/22 09:20 AM",
        dateModified: "26/10/22 09:20 AM",
      },
      {
        id: 2,
        image: "https://gravatar.com/avatar/d45a568c443a1aee6e81d4cd9e968189?s=400&d=robohash&r=x",
        name: "George Clooney",
        title: "Part time",
        role: "Delivery Partner",
        rating: 4,
        dateCreated: "25/10/22 09:20 AM",
        dateModified: "26/10/22 09:20 AM",
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
              <p style={{ fontSize: "12px", margin: 0 }}>{row.original.title}</p>
            </div>
          </div>
        ),
      },
      { Header: "Role", accessor: "role" },
      {
        Header: "Rating",
        accessor: "rating",
        Cell: ({ value }) => (
          <div
            style={{
              display: "inline-block",
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: value === 4 ? "#ff63ff" : "#6c63ff",
              color: "#fff",
              textAlign: "center",
            }}
          >
            ⭐ {value}
          </div>
        ),
      },
      { Header: "Date Created", accessor: "dateCreated" },
      { Header: "Date Modified", accessor: "dateModified" },
    //   {
    //     Header: "Action",
    //     Cell: () => (
    //       <button
    //         style={{
    //           background: "none",
    //           border: "none",
    //           cursor: "pointer",
    //           fontSize: "18px",
    //         }}
    //       >
    //         ⋮
    //       </button>
    //     ),
    //   },
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
    <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px", height : 
    "calc(100% - 40px)"
     }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
        <h2>Delivery Partners List</h2>
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
          + Add Delivery Partner
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

export default DeliveryDetails;
