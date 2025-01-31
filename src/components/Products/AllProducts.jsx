import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import Select from "react-select";
import { ReactComponent as DeleteIcon }from '../../assets/Delete.svg';
import { Popover, OverlayTrigger } from 'react-bootstrap';


const AllProducts = ({ products }) => {
  const [selectedOption, setSelectedOption] = useState({ value: "all", label: "all" });
  const [storeOption, setStoreOption] = useState({value : "1" , label : "Saravana Stores"})
  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Backup of all products
  const [selectedData, setSelectedData] = useState(null);
  const { categories, userType, stores } = useContext(UserContext);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
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
  : [{ value: "1", label: "Saravana Stores"}];;

    const getProducts = async () => {
      try {
        const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({ category: selectedOption.label, path: "/get/verified/products" }),
        });
        const {body} = await response.json();
        setAllProducts(body);
        setProductList(body);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    const handleDelete = async (id, index) => {
      try {
          const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id, path: "/delete/product" }),
            });
            if(response.statusCode === 200) {
              alert("Category deleted successfully");
              getProducts();
            }
      } catch (error) {
          console.error("Error: ", error);
    };
  }

    useEffect(() => {
        if (userType !== null) {
            getProducts();
        }
        }, [selectedOption]);

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
        
  return (
    <div>
      {/* Header Section */}
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

      {/* Products Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {productList.map((product, index) => (
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

<div style={{display:'flex',alignItems: 'start', justifyContent: 'space-between'}}>
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
            <DeleteIcon onClick={() => handleDelete(product.id)} style={{ fill: '#FF7300', width: '20px', height: '20px', cursor: 'pointer' }} />
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
            <div style={{display:'flex',alignItems: 'start', justifyContent: 'space-between'}}>
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
                            textDecoration : 'line-through'
                          }}
                          >₹ {product.mrp}
                          </h3>
                          </div>

                          <div style={{display:'flex',alignItems: 'start', justifyContent: 'space-between'}}>
                         <p 
                          style={{
                            fontSize: "16px",
                            color: "#555",
                            lineHeight: "26px",
                            marginTop: "10px",
                            marginBottom: 0,
                            fontWeight : 500,
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
                            fontWeight : 500,
                            textDecoration : product.stock === 'in-stock' ? 'none' : 'line-through'
                          }}
                          >{product.stock}
                          </p>
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
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
