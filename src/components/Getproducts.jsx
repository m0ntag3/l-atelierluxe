import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Mcarousel from './Mcarousel';

const Getproducts = ({ addToCart }) => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [currentPage, setCurrentPage] = useState(1);
const PRODUCTS_PER_PAGE = 8;

const navigate = useNavigate();
const img_url = "https://collinspaul.alwaysdata.net/static/images/";

const categories = [
    "All", "Watches", "Necklaces", "Colognes", "IceChains", "Rings",
];

const fetchProducts = async () => {
    try {
        setLoading(true);
        setError("");
        const response = await axios.get("https://collinspaul.alwaysdata.net/api/get_products");
        setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
        console.error("Fetch Error:", error);
        setError("Failed to load the collection. Please try again later.");
    } finally {
        setLoading(false);
    }
};

useEffect(() => { fetchProducts(); }, []);

// Reset to page 1 whenever search or category changes
useEffect(() => { setCurrentPage(1); }, [search, selectedCategory]);

const filtered_products = products.filter((item) => {
    const matchesSearch =
        item.product_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.product_description?.toLowerCase().includes(search.toLowerCase());
    const productCategory = item.category || item.product_category;
    const matchesCategory = selectedCategory === "All" || productCategory === selectedCategory;
    return matchesSearch && matchesCategory;
});

// Pagination calculations
const totalPages = Math.ceil(filtered_products.length / PRODUCTS_PER_PAGE);
const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
const paginated_products = filtered_products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
};

return (
    <div
        className="container-fluid px-4 py-5"
        style={{ backgroundColor: "#c8c3a0", minHeight: "100vh" }}
    >
        <Mcarousel />

        {/* Header */}
        <div className="text-center mb-5">
            <h2 className="text-uppercase fw-light mb-2" style={{ letterSpacing: "3px", color: "#1a1a1a" }}>
                The Collection
            </h2>
            <div style={{ width: "50px", height: "3px", background: "#e4bd73", margin: "0 auto" }}></div>
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
                    style={{ borderRadius: "30px", border: "1px solid #999" }}
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
                    style={{ borderRadius: "30px", border: "1px solid #999" }}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
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
                <button className="btn btn-outline-dark btn-sm" onClick={fetchProducts}>Retry</button>
            </div>
        )}

        {/* Empty Result */}
        {!loading && !error && filtered_products.length === 0 && (
            <div className="text-center py-5">
                <p className="text-muted">No products found in this category.</p>
            </div>
        )}

        {/* Product Cards */}
        <div className="row g-4">
            {!loading && paginated_products.map((product) => (
                <div className="col-lg-3 col-md-6 mb-4" key={product.product_id || product.id}>
                    <div className="card border-0 h-100 shadow-sm" style={{ borderRadius: "20px" }}>
                        <div className="overflow-hidden" style={{ height: "300px" }}>
                            <img
                                src={img_url + product.product_photo}
                                alt={product.product_name}
                                className="img-fluid w-100 h-100"
                                style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                                onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=No+Image"; }}
                            />
                        </div>

                        <div className="card-body text-center d-flex flex-column p-4" id="name">
                            <small className="text-uppercase mb-2" style={{ color: "#8a6d3b", letterSpacing: "1px" }}>
                                {product.category || product.product_category || "Uncategorized"}
                            </small>

                            <h6 className="text-uppercase fw-bold mb-2" style={{ color: "#e6c0c0", fontSize: "0.9rem", letterSpacing: "1px" }}>
                                {product.product_name || "Unnamed Piece"}
                            </h6>

                            <p className="text-light small mb-3" id="des">
                                {product.product_description
                                    ? product.product_description.slice(0, 70) + "..."
                                    : "No description available..."}
                            </p>

                            <div className="mt-auto">
                                <b className="mb-3 d-block" style={{ color: "#c5a059", fontSize: "1.2rem" }}>
                                    KES {product.product_cost ? Number(product.product_cost).toLocaleString() : "0"}
                                </b>

                                <button
                                    className="btn btn-dark w-100 rounded-0 py-2 text-uppercase"
                                    style={{ fontSize: "0.75rem", letterSpacing: "2px", backgroundColor: "#1a1a1a" }}
                                    onClick={() => navigate("/makepayment", { state: { product } })}
                                >
                                    Explore Piece
                                </button>
                                <br />
                                <button
                                    className="btn btn-dark w-100 rounded-0 py-2 text-uppercase"
                                    style={{ fontSize: "0.75rem", letterSpacing: "2px", backgroundColor: "#0b497c" }}
                                    onClick={() => typeof addToCart === 'function' && addToCart(product)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-5 gap-2 flex-wrap">

                {/* Back Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        backgroundColor: currentPage === 1 ? "#aaa" : "#1a1a1a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0",
                        padding: "8px 20px",
                        fontSize: "0.75rem",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        transition: "background 0.2s ease"
                    }}
                >
                    ← Back
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                            backgroundColor: page === currentPage ? "#e4bd73" : "transparent",
                            color: page === currentPage ? "#1a1a1a" : "#1a1a1a",
                            border: "1px solid #1a1a1a",
                            borderRadius: "0",
                            width: "36px",
                            height: "36px",
                            fontSize: "0.8rem",
                            fontWeight: page === currentPage ? "bold" : "normal",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        backgroundColor: currentPage === totalPages ? "#aaa" : "#1a1a1a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0",
                        padding: "8px 20px",
                        fontSize: "0.75rem",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                        transition: "background 0.2s ease"
                    }}
                >
                    Next →
                </button>
            </div>
        )}

        {/* Page Info */}
        {!loading && totalPages > 1 && (
            <p className="text-center mt-3" style={{ color: "#555", fontSize: "0.8rem", letterSpacing: "1px" }}>
                Page {currentPage} of {totalPages} — Showing {startIndex + 1}–{Math.min(startIndex + PRODUCTS_PER_PAGE, filtered_products.length)} of {filtered_products.length} pieces
            </p>
        )}

    </div>
);
};

export default Getproducts;