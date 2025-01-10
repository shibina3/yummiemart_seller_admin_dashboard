import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const Categories = ({fetchCategories}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const {  categories } = useContext(UserContext);

  const handleAddNew = () => {
    setIsPopupOpen(true);
    setCurrentCategory(null);
  };

  const handleEdit = (category) => {
    setIsPopupOpen(true);
    setCurrentCategory(category);
  };

  const handleDelete = async (id) => {
    try {
        const response = await fetch("http://localhost:4000/delete/category", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          if(response.status === 200) {
            alert("Category deleted successfully");
            fetchCategories();
          }
    } catch (error) {
        console.error("Error: ", error);
  };
}

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCategory = {
      name: formData.get("name"),
      description : formData.get("description"),
      image_url: "https://w7.pngwing.com/pngs/375/167/png-transparent-chocolate-spread-nutella-hazelnut-ferrero-spa-chocolate-natural-foods-food-grocery-store-thumbnail.png",
    };

    if (currentCategory) {
        newCategory.id = currentCategory.id;
        try {
            const response = fetch("http://localhost:4000/update/category", {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            });
            console.log(response);
            setIsPopupOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error: ", error);
    }
  }else{
    try {
        const response = fetch("http://localhost:4000/create/category", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory),
          });
          setIsPopupOpen(false);
          fetchCategories();
    } catch (error) {
        console.error("Error: ", error);
    }
  };
}

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Categories</h1>
      <button
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          background: "#0856AF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleAddNew}
      >
        Add New Category
      </button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <span>{category.name}</span>
            <div>
              <button
                onClick={() => handleEdit(category)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  background: "#6C757D",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                style={{
                  padding: "5px 10px",
                  background: "#FF7300",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            style={{
              background: "#FFF",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            onSubmit={handleSubmit}
          >
            <h2>{currentCategory ? "Edit Category" : "Add New Category"}</h2>
            <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentCategory?.name || ""}
                  placeholder="Category Name"
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />

            </div>
            <div style={{ marginBottom: "10px" }}>
                <textarea
                  name="description"
                  defaultValue={currentCategory?.description || ""}
                  rows="4"
                  placeholder="Category Description"
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <input
                  type="file"
                  name="image"
                  placeholder="Category Image"
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />
            </div>
            <div style={{ textAlign: "right", marginTop: "16px" }}>
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  background: "#6C757D",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "5px 10px",
                  background: "#007BFF",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;
