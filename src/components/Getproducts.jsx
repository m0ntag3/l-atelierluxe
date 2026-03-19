import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const img_url = "https://collinspaul.alwaysdata.net/static/images/";

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(""); // Reset error before fetching
            const response = await axios.get("https://collinspaul.alwaysdata.net/api/get_products");
            
            // Ensure we are setting an array even if the API response is unexpected
            setProducts(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Failed to load the collection. Please try again later.");
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='container-fluid px-4 py-5' style={{ backgroundColor: '#faf9f6', minHeight: '100vh' }}>
            
            {/* Header Section */}
            <div className="text-center mb-5">
                <h2 className="text-uppercase fw-light mb-2" style={{ letterSpacing: '3px', color: '#1a1a1a' }}>
                    The Collection
                </h2>
                <div style={{ width: '50px', height: '1px', background: '#c5a059', margin: '0 auto' }}></div>
            </div>

            {/* Status Handlers */}
            {loading && <Loader />}
            
            {error && (
                <div className="text-center py-5">
                    <p className="text-danger">{error}</p>
                    <button className="btn btn-outline-dark btn-sm" onClick={fetchProducts}>Retry</button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">No pieces currently available in the collection.</p>
                </div>
            )}

            {/* Product Grid */}
            <div className="row g-4">
                {!loading && products.map((product) => (
                    <div className="col-lg-3 col-md-6 mb-4" key={product.id}>
                        <div className="card border-0 h-100 shadow-sm" style={{ borderRadius: '0px' }}>
                            <div className="overflow-hidden" style={{ height: '300px' }}>
                                <img 
                                    src={img_url + product.product_photo} 
                                    alt={product.product_name}
                                    className='img-fluid w-100 h-100'
                                    style={{ 
                                        transition: 'transform 0.6s ease',
                                        objectFit: 'cover',
                                    }} 
                                    // Fallback for broken images
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'; }}
                                />
                            </div>

                            <div className="card-body text-center d-flex flex-column p-4">
                                <h6 className='text-uppercase fw-bold mb-2' style={{ color: '#e6c0c0', fontSize: '0.9rem', letterSpacing: '1px' }}>
                                    {product.product_name || "Unnamed Piece"}
                                </h6>

                                <p className="text-light small mb-3">
                                    {product.product_description?.slice(0, 70) || "No description available..."}...
                                </p> 

                                <div className="mt-auto">
                                    <b className="mb-3 fw-light" style={{ color: '#c5a059', fontSize: '1.2rem' }}>
                                        KES {product.product_cost ? Number(product.product_cost).toLocaleString() : "0"}
                                    </b>

                                    <button 
                                        className="btn btn-dark w-100 rounded-0 py-2 text-uppercase" 
                                        style={{ fontSize: '0.75rem', letterSpacing: '2px', backgroundColor: '#1a1a1a' }}
                                        onClick={() => navigate("/makepayment", { state: { product } })}
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