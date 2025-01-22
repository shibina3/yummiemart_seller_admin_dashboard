import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import "./ProductVerifySimplified.css"; // For styles
import Select from "react-select";
import { ReactComponent as DeleteIcon }from '../../assets/Delete.svg';


const ProductVerifySimplified = ({ products }) => {
  const [productStatuses, setProductStatuses] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentRejectIndex, setCurrentRejectIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState({ value: "all", label: "all" });
    const [storeOption, setStoreOption] = useState({value : "1" , label : "Saravana Stores"})
      const [allProducts, setAllProducts] = useState([]); // Backup of all products
     const { categories, stores } = useContext(UserContext);

  const handleAccept = (index) => {
    setProductStatuses((prevState) => ({
      ...prevState,
      [index]: "Accepted",
    }));
  };

  const handleRejectClick = (index) => {
    setCurrentRejectIndex(index);
    setShowPopup(true);
  };

  const handleRejectConfirm = () => {
    if (rejectionReason.trim()) {
      setProductStatuses((prevState) => ({
        ...prevState,
        [currentRejectIndex]: "Rejected",
      }));
      setShowPopup(false);
      setRejectionReason("");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setRejectionReason("");
  };

  const options = [
    { value: "all", label: "all" }, // Manual option
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const storeOptions = stores?.length > 0 
  ? stores.map((category) => ({
      value: category.id,
      label: category.name,
    }))
  : [{ value: "1", label: "Saravana Stores"}];

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const handleStoreSelectChange = (option) => {
    setStoreOption(option);
    // Filter products by store
    // const storeFilteredProducts = allProducts.filter(
    //   (product) => product.store_id === option.value.toString()
    // );
    //setProductList(storeFilteredProducts);
  };

  return <>
    <div
    style={{
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #dee2e6",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
      }}
    >
      {selectedOption && selectedOption.label !== 'all' ? selectedOption.label : "All Products"}
    </h2>
<div           style={{
        display : 'flex',
        alignItems: 'center',
        gap : '20px'
      }}>
<Select
      options={storeOptions}
      value={storeOption}
      onChange={handleStoreSelectChange}
      placeholder="Filter by store"
      styles={{
        control: (provided) => ({
          ...provided,
          minWidth: "250px",
        }),
      }}
    />
    <Select
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
      placeholder="Filter by category"
      styles={{
        control: (provided) => ({
          ...provided,
          minWidth: "250px",
        }),
      }}
    />
</div>
  </div>

    <div className="product-container">
      {products?.length ? (
        products.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2402573215/display_1500/stock-photo-udine-italy-december-nutella-jar-of-chocolate-spreadable-cream-isolated-white-background-2402573215.jpg"
              alt={product.name}
              className="product-image"
            />
          <div className="nameAndType">
          <h3 className="product-name">{product.name}</h3>
                      <DeleteIcon style={{ fill: '#FF7300', width: '20px', height: '20px', cursor: 'pointer' }} />
          
          </div>
          <p className="product-description" style={{                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                marginTop: 10}}>{product.description}</p>
          <div className="nameAndType" style={{marginTop: '10px'}}>
            <p className="product-address">{product.address}</p>
            <p className="product-description">{product.seller_type}</p>
            </div>
            <div className="nameAndType" style={{margin: '10px 0px 10px 0px'}}>
            <h3 className="product-price">₹ {product.price}</h3>
            <h3 className="product-price" style={{textDecoration : 'line-through'}}>₹ {product.price}</h3>
            </div>
            <div className="product-actions">
              <button
                className={`btn accept-btn ${
                  productStatuses[index] === "Accepted" && "disabled"
                }`}
                onClick={() => handleAccept(index)}
                disabled={productStatuses[index] === "Accepted"}
              >
                Accept
              </button>
              <button
                className={`btn reject-btn ${
                  productStatuses[index] === "Rejected" && "disabled"
                }`}
                onClick={() => handleRejectClick(index)}
                disabled={productStatuses[index] === "Rejected"}
              >
                Reject
              </button>
              <p
              className={`product-status ${
                productStatuses[index] === "Accepted"
                  ? "accepted"
                  : "rejected"
              }`}
            >
              {productStatuses[index] || ""}
            </p>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Reason for Rejection</h3>
            <input
              type="text"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason"
              className="popup-input"
            />
            <div className="popup-actions">
              <button
                className="btn submit-btn"
                onClick={handleRejectConfirm}
                disabled={!rejectionReason.trim()}
              >
                Submit
              </button>
              <button className="btn cancel-btn" onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
};

export default ProductVerifySimplified;
