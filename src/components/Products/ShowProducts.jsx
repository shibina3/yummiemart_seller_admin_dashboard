import React,{useEffect, useState, useContext} from "react";
import { UserContext } from "../../Context/UserContext";
import DeleteIcon from '../../assets/Delete.svg';

const ShowProducts = () => {
  // Random product list
  const products = [
    {
      id: 1,
      name: "Chocolate Spread",
      description: "Delicious chocolate spread perfect for breakfast and snacks.",
      image: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
    },
    {
      id: 2,
      name: "Organic Honey",
      description:
        "Pure organic honey sourced from the finest bee farms. Great for health.",
        image: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
    },
    {
      id: 3,
      name: "Green Tea",
      description:
        "Refreshing green tea packed with antioxidants to revitalize your day.",
        image: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
    },
    {
      id: 4,
      name: "Almond Butter",
      description:
        "Creamy almond butter made from premium almonds, rich in flavor.",
        image: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
    },
    {
      id: 5,
      name: "Granola Bars",
      description:
        "Healthy granola bars, perfect for on-the-go snacks and energy boosts.",
        image: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
    },
  ];

  const [productList, setProductList] = useState(products);
  const { userType } = useContext(UserContext);

  const mobile = localStorage.getItem("mobile");

  // const getProducts = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/get/products/for/seller", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ mobile: mobile }),
  //     });
  //     const data = await response.json();
  //     setProductList(data);
  //   } catch (error) {
  //     console.error("Error fetching products: ", error);
  //   }
  // }

  // useEffect(() => {
  //   if (userType !== null) {
  //     getProducts();
  //   }
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {productList.map((product) => (
        <div
          key={product.id}
          style={{
            width: "300px",
            padding: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          />
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
          <p
            style={{
              fontSize: "14px",
              color: "#555",
              lineHeight: "1.5",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3, // Ensures the text does not exceed three lines
            }}
          >
            {product.description}
          </p>
          {/* add status text */}
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <p style={{ color: "green", fontWeight: "bold", marginBottom: "0px" }}>Accepted</p>
            <img src={DeleteIcon} alt="Delete" width={24} height={24} style={{cursor : "pointer"}}/>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ShowProducts;
