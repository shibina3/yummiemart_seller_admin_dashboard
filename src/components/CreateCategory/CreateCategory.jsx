import React, { useState, useEffect, useContext } from "react";
import AWS from 'aws-sdk';
import { UserContext } from "../../Context/UserContext";

const Categories = ({fetchCategories}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [file, setFile] = useState(null);
  const {  categories } = useContext(UserContext);
  const [loading, setLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(categories.map(() => false));


  const handleAddNew = () => {
    setIsPopupOpen(true);
    setCurrentCategory(null);
  };

  const handleEdit = (category) => {
    setIsPopupOpen(true);
    setCurrentCategory(category);
  };

  const handleDelete = async (id, index) => {
    const updatedLoading = [...deleteLoading];
    updatedLoading[index] = true;
    setDeleteLoading(updatedLoading);
    try {
        const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, path: "/delete/category" }),
          });
          if(response.statusCode === 200) {
            const updatedLoading = [...deleteLoading];
            updatedLoading[index] = false;
            setDeleteLoading(updatedLoading);
            alert("Category deleted successfully");
            fetchCategories();
          }
    } catch (error) {
        console.error("Error: ", error);
  };
}

    const uploadImageToS3 = async (file) => {
        const s3 = new AWS.S3({
            accessKeyId: "AKIASFIXCT2YTIXF5453",
            secretAccessKey: "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",
            region: 'us-east-1',
        });
        const params = {
            Bucket: 'yummiemart.in',
            Key: `uploads/stores/${1}/products/${file.name}`,
            Body: file,
            ContentType : file.type,
        };
        return s3.upload(params).promise();
    }

    const singleFileUpload = async (file) => {
        return uploadImageToS3(file);
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadedFile = await singleFileUpload(file);
    const formData = new FormData(e.target);
    const newCategory = {
      name: formData.get("name"),
      description : formData.get("description"),
      image_url: uploadedFile,
    };

    if (currentCategory) {
        newCategory.id = currentCategory.id;
        newCategory.image_url = currentCategory.image_url
        newCategory.path = '/update/category';
        try {
            fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            });
            setLoading(false);
            setIsPopupOpen(false);
            alert('Category edited successfully')
            fetchCategories();
        } catch (error) {
            console.error("Error: ", error);
    }
  }else{
    newCategory.path = '/create/category';
    try {
        await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory),
          });
          setLoading(false);
          setIsPopupOpen(false);
          alert('Category created successfully')
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
        {categories.map((category, index) => (
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
                onClick={() => handleDelete(category.id, index)}
                style={{
                  padding: "5px 10px",
                  background: "#FF7300",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {deleteLoading[index] ? 'Please wait...' : 'Delete'}
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
                  onChange={(e) => setFile( e.target.files[0])}
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
                {loading ? 'Please wait...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;
