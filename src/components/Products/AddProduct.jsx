import React,{ useState, useContext} from "react";
import { UserContext } from "../../Context/UserContext";
import AWS from 'aws-sdk';
import Select from "react-select";

const AddProduct = () => {

    const { categories } = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState(null);

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
    
    const multipleFilesUpload = async (files) => {
        const promises = [];
        for (let i = 0; i < files.length; i++) {
            promises.push(uploadImageToS3(files[i]));
        }
        return Promise.all(promises);
    }
    
    const singleFileUpload = async (file) => {
        return uploadImageToS3(file);
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const uploadedFile = await singleFileUpload(file);
    const uploadedFiles = await multipleFilesUpload(files);
    const productImages = uploadedFiles.map(file => (file.Location ));
    console.log("productImages: ", productImages);
    const newProduct = {
        name: formData.get("productName"),
        description: formData.get("description"),
        category_id : formData.get("categoryId"),
        products_images : productImages,
        allow_get_quote : null,
        stock : "in-stock",
        store_id : formData.get("storeId"),
        mrp: formData.get("originalPrice"),
        yummy_price: formData.get("offerPrice"),
        max_quantity: formData.get("quantity"),
        min_quantity: formData.get("minQuantity"),
        min_b2b_quantity: formData.get("minB2bQuantity"),
        thumbnail_image : uploadedFile.Location
    };

    try{
        newProduct.path = '/create/product';
        await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        alert("Product added successfully");
    }catch(error){
        console.error("Error: ", error);
    }
  };

const categoriesSelect = categories?.map((category) => ({
    value: category.id,
    label: category.name,
}));

const stockDetails = [
    { value: "in-stock", label: "In Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ maxHeight: "680px", overflowY: "scroll" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>Product Name:</label>
          <input
            type="text"
            defaultValue={""}
            name="productName"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Description:</label>
          <textarea
          defaultValue={""}
          name="description"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Category_id:</label>
          <Select
            options={categoriesSelect}
            defaultValue={categoriesSelect[0]}
            name="categoryId"
            placeholder="Select Category"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Stock:</label>
          <Select
            options={stockDetails}
            defaultValue={stockDetails[0]}
            name="categoryId"
            placeholder="Select Category"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Original Price:</label>
          <input
            type="number"
            defaultValue={""}
            name="originalPrice"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Offer Price:</label>
          <input
            type="number"
            defaultValue={""}
            name="offerPrice"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Store_id:</label>
          <input
            type="number"
            defaultValue={""}
            name="storeId"
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}
            required
          />
        </div>

        {/* <div style={{ marginBottom: "15px" }}>
          <label>Allow get quote:</label>
          <input
            type="checkbox"
            defaultValue={false}
            name="allowGetQuote"
            style={{padding: "8px", margin: "10px", boxSizing : "border-box" }}
            required
          />
        </div> */}

<div style={{ marginBottom: "15px" }}> 
<label>Max Quantity:</label>
    <input type="number" name="quantity" placeholder="Max Quantity" required  style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}/>
</div>

<div style={{ marginBottom: "15px" }}>
    <label>Min Quantity:</label>
    <input type="number" name="minQuantity" placeholder="Min Quantity" required  style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}/>
</div>

<div style={{ marginBottom: "15px" }}>
    <label>Min B2B Quantity:</label>
    <input type="number" name="minB2bQuantity" placeholder="Min B2B Quantity" required  style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}/>
</div>

        <div style={{ marginBottom: "15px" }}>
          <label>Product Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}
            onChange={(e) => setFiles( e.target.files)}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Thumbnail Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile( e.target.files[0])}
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing : "border-box" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
