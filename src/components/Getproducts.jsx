import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Mcarousel from './Mcarousel';

const Getproducts = () => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

const navigate = useNavigate();
const img_url = "https://collinspaul.alwaysdata.net/static/images/";

// Fixed categories
const categories = [
    "All",
    "Watches",
    "Necklaces",
    "Colognes",
    "IceChains",
    "Rings",
];

const fetchProducts = async () => {
    try {
        setLoading(true);
        setError("");

        const response = await axios.get(
            "https://collinspaul.alwaysdata.net/api/get_products"
        );

        setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
        console.error("Fetch Error:", error);
        setError("Failed to load the collection. Please try again later.");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchProducts();
}, []);

// Filter by search and selected category
const filtered_products = products.filter((item) => {
    const matchesSearch =
        item.product_name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
        item.product_description
            ?.toLowerCase()
            .includes(search.toLowerCase());

    // use category or product_category from your database
    const productCategory = item.category || item.product_category;

    const matchesCategory =
        selectedCategory === "All" ||
        productCategory === selectedCategory;

    return matchesSearch && matchesCategory;
});

return (
    <div
        className="container-fluid px-4 py-5"
        style={{
            backgroundColor: "#c8c3a0",
            minHeight: "100vh"
        }}
    >
        <Mcarousel />

        {/* Header */}
        <div className="text-center mb-5">
            <h2
                className="text-uppercase fw-light mb-2"
                style={{
                    letterSpacing: "3px",
                    color: "#1a1a1a"
                }}
            >
                The Collection
            </h2>

            <div
                style={{
                    width: "50px",
                    height: "3px",
                    background: "#c5a059",
                    margin: "0 auto"
                }}
            ></div>
        </div>

        {/* Search */}
        <div className="row justify-content-center mb-4">
            <div className="col-md-6">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search Creations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        borderRadius: "0",
                        border: "1px solid #999"
                    }}
                />
            </div>
        </div>

        {/* Category Filter */}
        <div className="row justify-content-center mb-5">
            <div className="col-md-4">
                <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        borderRadius: "0",
                        border: "1px solid #999"
                    }}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        {/* Loader */}
        {loading && <Loader />}

        {/* Error */}
        {error && (
            <div className="text-center py-5">
                <p className="text-danger">{error}</p>
                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={fetchProducts}
                >
                    Retry
                </button>
            </div>
        )}

        {/* Empty Result */}
        {!loading && !error && filtered_products.length === 0 && (
            <div className="text-center py-5">
                <p className="text-muted">
                    No products found in this category.
                </p>
            </div>
        )}

        {/* Product Cards */}
        <div className="row g-4">
            {!loading &&
                filtered_products.map((product) => (
                    <div
                        className="col-lg-3 col-md-6 mb-4"
                        key={product.product_id || product.id}
                    >
                        <div
                            className="card border-0 h-100 shadow-sm"
                            style={{ borderRadius: "0px" }}
                        >
                            <div
                                className="overflow-hidden"
                                style={{ height: "300px" }}
                            >
                                <img
                                    src={img_url + product.product_photo}
                                    alt={product.product_name}
                                    className="img-fluid w-100 h-100"
                                    style={{
                                        objectFit: "cover",
                                        transition: "transform 0.6s ease"
                                    }}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/300x400?text=No+Image";
                                    }}
                                />
                            </div>

                            <div
                                className="card-body text-center d-flex flex-column p-4"
                                id="name"
                            >
                                {/* Category */}
                                <small
                                    className="text-uppercase mb-2"
                                    style={{
                                        color: "#8a6d3b",
                                        letterSpacing: "1px"
                                    }}
                                >
                                    {product.category ||
                                        product.product_category ||
                                        "Uncategorized"}
                                </small>

                                {/* Product Name */}
                                <h6
                                    className="text-uppercase fw-bold mb-2"
                                    style={{
                                        color: "#e6c0c0",
                                        fontSize: "0.9rem",
                                        letterSpacing: "1px"
                                    }}
                                >
                                    {product.product_name || "Unnamed Piece"}
                                </h6>

                                {/* Description */}
                                <p
                                    className="text-light small mb-3"
                                    id="des"
                                >
                                    {product.product_description
                                        ? product.product_description.slice(
                                                0,
                                                70
                                            ) + "..."
                                        : "No description available..."}
                                </p>

                                <div className="mt-auto">
                                    {/* Price */}
                                    <b
                                        className="mb-3 d-block"
                                        style={{
                                            color: "#c5a059",
                                            fontSize: "1.2rem"
                                        }}
                                    >
                                        KES{" "}
                                        {product.product_cost
                                            ? Number(
                                                    product.product_cost
                                                ).toLocaleString()
                                            : "0"}
                                    </b>

                                    {/* Button */}
                                    <button
                                        className="btn btn-dark w-100 rounded-0 py-2 text-uppercase"
                                        id="price"
                                        style={{
                                            fontSize: "0.75rem",
                                            letterSpacing: "2px",
                                            backgroundColor: "#1a1a1a"
                                        }}
                                        onClick={() =>
                                            navigate("/makepayment", {
                                                state: { product }
                                            })
                                        }
                                    >
                                        Explore Piece
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
);
};

export default Getproducts;