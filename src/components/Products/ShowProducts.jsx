import React,{useEffect, useState, useContext} from "react";
import { UserContext } from "../../Context/UserContext";
import { Popover, OverlayTrigger } from 'react-bootstrap';

const ShowProducts = () => {


  const [productList, setProductList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const { userType } = useContext(UserContext);

  const mobile = localStorage.getItem("mobile");

  const getProducts = async () => {
    try {
      const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: mobile,path: "/get/products/for/seller" }),
      });
      const data = await response.json();
      setProductList(data.body);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }

  useEffect(() => {
    if (userType !== null) {
      getProducts();
    }
  }, []);

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

  return (
    <div className="d-flex flex-wrap align-items-center" style={{ gap: "20px" }}>
      {productList.length === 0 ? (
        <p>You have not added any products yet.</p>
      ) : (
        productList.map((product, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              padding: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2402573215/display_1500/stock-photo-udine-italy-december-nutella-jar-of-chocolate-spreadable-cream-isolated-white-background-2402573215.jpg"
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: "0 0 8px",
                  color: "#333",
                }}
              >
                {product.name}
              </h3>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#555",
                lineHeight: "1.5",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                marginTop: "10px",
              }}
            >
              {product.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <h3
                style={{
                  fontSize: "18px",
                  color: "black",
                  lineHeight: "26px",
                  marginTop: "10px",
                  marginBottom: 0,
                }}
              >₹ {product.yummy_price}
              </h3>
              <h3
                style={{
                  fontSize: "18px",
                  color: "#555",
                  lineHeight: "26px",
                  marginTop: "10px",
                  marginBottom: 0,
                  textDecoration: 'line-through'
                }}
              >₹ {product.mrp}
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <p
                style={{
                  fontSize: "16px",
                  color: "#555",
                  lineHeight: "26px",
                  marginTop: "10px",
                  marginBottom: 0,
                  fontWeight: 500,
                }}
              >Stock :
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: product.stock === 'in-stock' ? 'green' : 'red',
                  lineHeight: "26px",
                  marginTop: "10px",
                  marginBottom: 0,
                  fontWeight: 500,
                  textDecoration: product.stock === 'in-stock' ? 'none' : 'line-through'
                }}
              >{product.stock}
              </p>
            </div>
            <OverlayTrigger
              trigger="click"
              placement="top"
              overlay={popover}
              rootClose={true}
              onToggle={() => setSelectedData(product)}

            >
              <div className="d-flex align-items-center justify-content-end mt-3 cursor-pointer">
                <p style={{ color: "rgb(8, 86, 175)", cursor: "pointer" }}>Click here for more details</p>
              </div>
            </OverlayTrigger>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowProducts;
