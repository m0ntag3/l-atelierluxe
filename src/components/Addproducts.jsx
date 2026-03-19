import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import '../css/signin.css'; // Using the same CSS file for a consistent UI

const Addproducts = () => {
    // State hooks for product details
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");

    // Status management hooks
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear previous errors

        try {
            const formdata = new FormData();
            formdata.append("product_name", product_name);
            formdata.append("product_description", product_description);
            formdata.append("product_cost", product_cost);
            formdata.append("product_photo", product_photo);

            const response = await axios.post("https://collinspaul.alwaysdata.net/api/add_product", formdata);

            setLoading(false);
            setSuccess(response.data.message || "Product added successfully!");

            // Reset local hooks
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");

            // Reset the physical form (clears file input)
            e.target.reset();

            setTimeout(() => {
                setSuccess("");
            }, 4000);
        } catch (err) {
            setLoading(false);
            setError(err.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="text-center text-white mb-3 fw-bold">New Creation</h2>

                {/* Status Indicators */}
                {loading && <Loader />}
                {success && <p className="text-center small text-white bg-success p-2 rounded">{success}</p>}
                {error && <p className="text-center small text-danger bg-white p-2 rounded">{error}</p>}

                {/* Product Name */}
                <div className="flex-column">
                    <label>Creation Name</label>
                </div>
                <div className="inputForm">
                    <input 
                        placeholder="What are we creating?" 
                        className="input" 
                        type="text" 
                        required 
                        value={product_name}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>

                {/* Product Description */}
                <div className="flex-column">
                    <label>Description</label>
                </div>
                <div className="inputForm">
                    <input 
                        placeholder="Tell us about it..." 
                        className="input" 
                        type="text" 
                        required 
                        value={product_description}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </div>

                {/* Product Cost */}
                <div className="flex-column">
                    <label>Price (Ksh)</label>
                </div>
                <div className="inputForm">
                    <input 
                        placeholder="Enter amount" 
                        className="input" 
                        type="number" 
                        required 
                        value={product_cost}
                        onChange={(e) => setProductCost(e.target.value)}
                    />
                </div>

                {/* Product Photo */}
                <div className="flex-column">
                    <label>Creation Photo</label>
                </div>
                <div className="inputForm" style={{ paddingRight: '10px' }}>
                    <input 
                        className="input" 
                        type="file" 
                        required 
                        accept="image/*"
                        onChange={(e) => setProductPhoto(e.target.files[0])}
                        style={{ fontSize: '12px' }} // Makes the "Choose File" text fit better
                    />
                </div>

                <button type="submit" className="button-submit">Add Product</button>
            </form>
        </div>
    );
};

export default Addproducts;