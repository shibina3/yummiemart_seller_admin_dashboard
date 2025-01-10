import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VerifySeller from "../VerifySeller/VerifySeller";
import ProductList from "../ProductListVerify/ProductList";
import CreateCategoryForm from "../CreateCategory/CreateCategory";
import AddProduct from "../Products/AddProduct";
import ShowProducts from "../Products/ShowProducts";

const RightSidebar = ({userType, fetchCategories}) => {

  const products = [
    {
      name: 'John Doe',
      seller_type: 'distributor',
      image_url: 'https://via.placeholder.com/150',
      address: 'Mumbai, Maharashtra',
      rating: '4.5',
      reviews: 'Good service',
    },
    {
      name: 'Jane Smith',
      seller_type: 'dealer',
      image_url: 'https://via.placeholder.com/150',
      address: 'Delhi, India',
      rating: '4.8',
      reviews: 'Excellent quality',
    },
    {
      name: 'Alan Brown',
      seller_type: 'retailer',
      image_url: 'https://via.placeholder.com/150',
      address: 'Bangalore, Karnataka',
      rating: '4.2',
      reviews: 'Satisfactory experience',
    },
  ];

const VerifySellers = () => <VerifySeller />;
const VerifyProducts = () => <ProductList products={products}/>;
const CreateCategory = () => <CreateCategoryForm fetchCategories={fetchCategories}/>;

 return (
    <div
      style={{
        width:  "calc(100% - 300px)" ,
        padding: "20px",
        backgroundColor: "#FFF5E4",
        height: "Calc(100vh - 40px)",
      }}
    >
      <Routes>
      <Route path="/" element={<Navigate to="/verify-sellers" replace />} />
        <Route path="/verify-sellers" element={<VerifySellers />} />
        <Route path="/verify-products" element={<VerifyProducts />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<ShowProducts />} />
      </Routes>
    </div>
  );
};

export default RightSidebar;
