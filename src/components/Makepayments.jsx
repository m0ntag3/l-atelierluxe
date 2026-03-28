import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};

    // Redirect if no product is found (e.g., on page refresh)
    useEffect(() => {
        if (!product) {
            navigate("/");
        }
    }, [product, navigate]);

    const img_url = "https://collinspaul.alwaysdata.net/static/images/";

    // State Hooks
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // Simple validation for Kenyan phone numbers
        if (!phone.startsWith("254") || phone.length !== 12) {
            setError("Please enter a valid phone number starting with 254 (12 digits).");
            setLoading(false);
            return;
        }

        try {
            const formdata = new FormData();
            formdata.append("phone", phone);
            formdata.append("amount", product.product_cost);

            const response = await axios.post("https://collinspaul.alwaysdata.net/api/mpesa_payment", formdata);
            
            setLoading(false);
            setSuccess(response.data.message || "Request sent! Check your phone for the M-Pesa PIN prompt.");

        } catch (error) {
            setLoading(false);
            // Handle specific Axios error messages
            setError(error.response?.data?.message || "An error occurred. Please check your connection.");
        }
    };

    if (!product) return null; // Prevent rendering errors before redirect

    return (
        <div className='container py-5'>
            {/* Navigation Header */}
            <div className="d-flex align-items-center mb-4">
                <button className="btn btn-outline-dark shadow p-4" onClick={() => navigate("/")}>
                    ← Back to Collection
                </button>
            </div>

            <div className='row justify-content-center'>
                <div className="col-lg-10">
                    <div className="card shadow-sm border-0 rounded-0 overflow-hidden">
                        <div className="row g-0" id='payimg'>
                            
                            
                            <div className="col-md-6" id='payimg'>
                                <img 
                                    src={img_url + product.product_photo} 
                                    alt={product.product_name} 
                                    className='img-fluid h-100'
                                    style={{ objectFit: 'cover', minHeight: '400px' }}
                                />
                            </div>

                            
                            <div className="col-md-6 p-4 p-lg-5 bg-light">
                                <h6 className="text-uppercase text-muted mb-1" style={{ letterSpacing: '2px' }}>
                                    Secure Checkout
                                </h6>
                                <h2 className="fw-bold mb-3" id='name'>{product.product_name}</h2>
                                <p className="text-muted mb-4" id='des'>{product.product_description.slice(0,50)}...</p>
                                
                                <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light">
                                    <span className="text-dark">Total Amount</span>
                                    <span className="h4 mb-0 fw-bold" style={{ color: '#c5a059' }}>
                                        KES {Number(product.product_cost).toLocaleString()}
                                    </span>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input 
                                            type="tel"
                                            className='form-control form-control-lg rounded-0'
                                            placeholder='2547XXXXXXXX'
                                            required 
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        
                                    </div>

                                    {/* Status Feedback */}
                                    {loading && <div className="mb-3 text-center"><Loader /></div>}
                                    {success && <div className="alert alert-success rounded-0 small">{success}</div>}
                                    {error && <div className="alert alert-danger rounded-0 small">{error}</div>}

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className='btn btn-dark w-100 rounded-0 py-3 mt-3 text-uppercase'
                                        style={{ letterSpacing: '2px', backgroundColor: '#1a1a1a' }}
                                    >
                                        {loading ? "Processing..." : "Initiate Payment"}
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" 
                                        alt="M-Pesa" 
                                        style={{ height: '30px', opacity: '0.7' }} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Makepayment;