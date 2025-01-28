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

  const handleLogout = () => {
  localStorage.removeItem("mobile");
  window.location.href = "/";
  }

  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#FFD9BA",
        padding: "20px",
        position:'relative'
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
          
          <NavLink to="/all-products" style={({ isActive }) => getNavLinkStyle(isActive)}>
            All Products (verified)
          </NavLink>
                    
          <NavLink to="/delivery-partner" style={({ isActive }) => getNavLinkStyle(isActive)}>
            Delivery partner
          </NavLink>
                    
          <NavLink to="/activity-logs" style={({ isActive }) => getNavLinkStyle(isActive)}>
            Activity logs
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
      <div style={{
        backgroundColor: 'rgb(8, 86, 175)',
        padding : '3px 0px 3px 0px',
        position: 'absolute',
        bottom : 0,
        left : 0,
        width : '100%',
        textAlign: 'center',
        color : 'white',
        cursor: 'pointer'
      }} onClick={handleLogout}>Logout</div>
    </div>
  );
});

export default LeftSidebar;


// Edit Category Flow: Review and improve the process for editing categories.
// Verify Products List: Ensure all seller-submitted products undergo proper verification.
// Get Seller Details API: Enhance the API to include additional information, such as certificate images.
// Image Issue: Address the issue where images from the backend are not displaying on the client side due to URLs starting with an IP address.
// Verified Sellers List: Implement a feature to retrieve and display a list of verified sellers.
