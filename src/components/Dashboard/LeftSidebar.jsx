import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const LeftSidebar = React.memo(({ userType }) => {
  const location = useLocation();

  const baseStyle = {
    display: "block",
    padding: "10px",
    marginBottom: "16px",
    textDecoration: "none",
    borderRadius: "5px",
    color: "#000",
    backgroundColor: "#FFD9BA",
  };

  const activeStyle = {
    backgroundColor: "#FF7300",
    color: "#fff",
  };

  const getNavLinkStyle = (isActive) =>
    isActive || location.pathname === "/" ? { ...baseStyle, ...activeStyle } : baseStyle;

  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#FFD9BA",
        padding: "20px",
      }}
    >
      {userType === "admin" ? (
        <>
          <NavLink to="/verify-sellers" style={({ isActive }) => getNavLinkStyle(isActive)}>
            Verify Sellers
          </NavLink>

          <NavLink to="/verify-products" style={({ isActive }) => getNavLinkStyle(isActive)}>
            Verify Products
          </NavLink>

          <NavLink to="/create-category" style={({ isActive }) => getNavLinkStyle(isActive)}>
            Create Category
          </NavLink>
        </>
      ) : userType === "seller" ? (
<>
<NavLink to="/add-product" style={({ isActive }) => getNavLinkStyle(isActive)}>
          Add Product
        </NavLink>
                <NavLink to="/products" style={({ isActive }) => getNavLinkStyle(isActive)}>
                Products
              </NavLink>
</>
      ) : null}
    </div>
  );
});

export default LeftSidebar;
