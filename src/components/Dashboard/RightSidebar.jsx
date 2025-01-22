import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VerifySeller from "../VerifySeller/VerifySeller";
import ProductList from "../ProductListVerify/ProductList";
import CreateCategoryForm from "../CreateCategory/CreateCategory";
import AddProduct from "../Products/AddProduct";
import ShowProducts from "../Products/ShowProducts";
import AllProducts from "../Products/AllProducts";
import DeliveryPartner from "../DeliveryPartner/DeliveryPartner";
import ActivityLogs from "../ActivityLogs/ActivityLogs";

const RightSidebar = ({userType, fetchCategories}) => {

  const products = [
    {
      name: 'John Doe',
      seller_type: 'distributor',
      image_url: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
      address: 'Mumbai, Maharashtra',
      price : 400,
      rating: '4.5',
      reviews: 'Good service',
      description : "Fresh, and delicious tomatoes are a summertime favourite. Tomatoes are perfect for sauces and salsas, or try marinating them in herbs and olive oil for an easy appetizer."
    },
    {
      name: 'Jane Smith',
      seller_type: 'dealer',
      image_url: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
      address: 'Delhi, India',
      price : 400,
      rating: '4.8',
      reviews: 'Excellent quality',
      description : "Fresh, and delicious tomatoes are a summertime favourite. Tomatoes are perfect for sauces and salsas, or try marinating them in herbs and olive oil for an easy appetizer."
    },
    {
      name: 'Alan Brown',
      seller_type: 'retailer',
      image_url: "https://via.placeholder.com/300x200.png?text=Chocolate+Spread",
      address: 'Bangalore, Karnataka',
      price : 400,
      rating: '4.2',
      reviews: 'Satisfactory experience',
      description : "Fresh, and delicious tomatoes are a summertime favourite. Tomatoes are perfect for sauces and salsas, or try marinating them in herbs and olive oil for an easy appetizer."
    },
  ];

const VerifySellers = () => <VerifySeller />;
const VerifyProducts = () => <ProductList products={products}/>;
const CreateCategory = () => <CreateCategoryForm fetchCategories={fetchCategories}/>;
const AllProductList = () => <AllProducts products={products}/>;

 return (
    <div
      style={{
        width:  "calc(100% - 300px)" ,
        padding: "20px",
        backgroundColor: "#FFF5E4",
        height: "Calc(100vh - 120px)",
        overflowY: "scroll"
      }}
    >
      <Routes>
      <Route path="/" element={<Navigate to="/verify-sellers" replace />} />
        <Route path="/verify-sellers" element={<VerifySellers />} />
        <Route path="/verify-products" element={<VerifyProducts />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<ShowProducts />} />
        <Route path="/all-products" element={<AllProductList />} />
       <Route path="/delivery-partner" element={<DeliveryPartner />} />
       <Route path="/activity-logs" element={<ActivityLogs />}/>
      </Routes>
    </div>
  );
};

export default RightSidebar;
