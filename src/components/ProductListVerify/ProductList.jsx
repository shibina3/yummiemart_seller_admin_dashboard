import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import "./ProductVerifySimplified.css"; // For styles
import Select from "react-select";
import { ReactComponent as DeleteIcon }from '../../assets/Delete.svg';
import { Popover, OverlayTrigger } from 'react-bootstrap';


const ProductVerifySimplified = ({ products }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
    const [selectedOption, setSelectedOption] = useState({ value: "all", label: "all" });
    const [storeOption, setStoreOption] = useState({value : "1" , label : "Saravana Stores"})
      const [allProducts, setAllProducts] = useState([]); // Backup of all products
      const [productList, setProductList] = useState([]);
      const [selectedData, setSelectedData] = useState(null);
     const { categories, stores, userType } = useContext(UserContext);

  const handleAccept = async (id) => {
   try{
    const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, path: "/accept/product" }),
    });
    getProducts();
   }catch(err){
      console.error("Error accepting product: ", err);
   }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({ category: selectedOption.label, path: "/get/unverified/products" }),
      });
      const {body} = await response.json();
      setAllProducts(body);
      setProductList(body);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleRejectClick = (id) => {
    setSelectedData(id);
    setShowPopup(true);
  };

  const handleRejectConfirm = async (id) => {
    console.log("Rejecting product: ", id);
    try {
      const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, path: "/reject/product", comments: rejectionReason }),
      });
      getProducts();
      closePopup();
    } catch (error) {
      console.error("Error rejecting product: ", error);
    }
  }

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
    const storeFilteredProducts = allProducts.filter(
      (product) => product.store_id === option.value.toString()
    );
    setProductList(storeFilteredProducts);
  };

  const popover = (
    <Popover id="custom-popover" style={{ maxWidth: '500px', width: '500px', inset: "0px auto 40px 0px",
      height: "max-content" }}>
      <Popover.Header as="h3" className="d-flex align-items-center justify-content-between">
        {selectedData?.name || 'No Title'}
        <img
        src={'https://www.shutterstock.com/shutterstock/photos/2402573215/display_1500/stock-photo-udine-italy-december-nutella-jar-of-chocolate-spreadable-cream-isolated-white-background-2402573215.jpg'}
        alt={selectedData?.name}
        style={{
          width: "50px",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      />
        </Popover.Header>
      <Popover.Body>
        {selectedData?.description || 'No Description Available'}
        <br />
<div className="d-flex align-items-start justify-content-between mt-2">
<p className="mb-1">
store_id : <b>{selectedData?.store_id || 'N/A'}</b>
</p>
<p className="mb-1">
mrp : <b>{selectedData?.mrp || 'N/A'}</b>
</p>
</div>

<div className="d-flex align-items-start justify-content-between">
<p className="mb-1">
yummy_price : <b>{selectedData?.yummy_price || 'N/A'}</b>
</p>
<p className="mb-1">
is_admin_verified : <b>{selectedData?.is_admin_verified || 'N/A'}</b>
</p>
</div>

<div className="d-flex align-items-start justify-content-between">
<p className="mb-1">
allow_get_quote : <b>{selectedData?.allow_get_quote || 'N/A'}</b>
</p>
<p className="mb-1">
max_quantity : <b>{selectedData?.max_quantity || 'N/A'}</b>
</p>
</div>

<div className="d-flex align-items-start justify-content-between">
<p className="mb-1">
min_quantity : <b>{selectedData?.min_quantity || 'N/A'}</b>
</p>
<p className="mb-1">
min_b2b_quantity : <b>{selectedData?.min_b2b_quantity || 'N/A'}</b>
</p>
</div>

<div className="d-flex align-items-start justify-content-between">
<p className="mb-1">
admin_comments : <b>{selectedData?.admin_comments || 'N/A'}</b>
</p>
<p className="mb-1">
verification_status : <b>{selectedData?.verification_status || 'N/A'}</b>
</p>
</div>

      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    if (userType !== null) {
        getProducts();
    }
    }, [selectedOption]);

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
      {productList?.length ? (
        productList.map((product, index) => (
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
            <h3 className="product-price">₹ {product.yummy_price}</h3>
            <h3 className="product-price" style={{textDecoration : 'line-through'}}>₹ {product.mrp}</h3>
            </div>
            <div className="product-actions">
              <button
                className={`accept-btn`}
                onClick={() => handleAccept(product.id)}
              >
                Accept
              </button>
              <button
                className={`reject-btn`}
                onClick={() => handleRejectClick(product.id)}
              >
                Reject
              </button>
            </div>
            <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        onToggle={() => setSelectedData(product)}
      >
       <div className="d-flex align-items-center justify-content-end mt-3 cursor-pointer">
       <p style={{color: "rgb(8, 86, 175)", cursor:"pointer"}}>Click here for more details</p>
       </div>
      </OverlayTrigger>
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
                onClick={() => handleRejectConfirm(18)}
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
