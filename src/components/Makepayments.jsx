import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Supports both single product and cart checkout
    const { product, cart, totalPrice } = location.state || {};
    const isCartCheckout = !!cart && cart.length > 0;

    const img_url = "https://collinspaul.alwaysdata.net/static/images/";

    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const getPrice = (item) => Number(item.product_cost || item.price || 0);
    const getName  = (item) => item.product_name || item.name || "Unnamed Piece";
    const getId    = (item) => item.product_id || item.id;

    // Redirect if nothing to pay for
    useEffect(() => {
        if (!product && !isCartCheckout) {
            navigate("/");
        }
    }, [product, isCartCheckout, navigate]);

    // Amount to charge
    const amountToPay = isCartCheckout
        ? totalPrice
        : Number(product?.product_cost || 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = localStorage.getItem('user');
        if (!userData) {
            alert("Please login to proceed with payment.");
            navigate("/signin", { state: { from: location } });
            return;
        }

        if (!phone.startsWith("254") || phone.length !== 12) {
            setError("Please enter a valid phone number starting with 254 (12 digits).");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const formdata = new FormData();
            formdata.append("phone", phone);
            formdata.append("amount", amountToPay);

            const response = await axios.post(
                "https://collinspaul.alwaysdata.net/api/mpesa_payment",
                formdata
            );

            setLoading(false);
            setSuccess(response.data.message || "Request sent! Check your phone for the M-Pesa PIN prompt.");

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "An error occurred. Please check your connection.");
        }
    };

    if (!product && !isCartCheckout) return null;

    return (
        <div className='container py-5'>
            {/* Back Button */}
            <div className="d-flex align-items-center mb-4">
                <button
                    className="btn btn-outline-dark shadow p-3"
                    onClick={() => navigate(isCartCheckout ? "/cart" : "/")}
                >
                    ← {isCartCheckout ? "Back to Cart" : "Back to Collection"}
                </button>
            </div>

            <div className='row justify-content-center'>
                <div className="col-lg-10">
                    <div className="card shadow-sm border-0 rounded-0 overflow-hidden">
                        <div className="row g-0">

                            {/* LEFT — product image (single) or item list (cart) */}
                            <div className="col-md-6" style={{ backgroundColor: "#1a1a1a" }}>
                                {isCartCheckout ? (
                                    <div className="p-4 h-100 d-flex flex-column justify-content-center">
                                        <h6
                                            className="text-uppercase mb-4"
                                            style={{ letterSpacing: "2px", color: "#aaa", fontSize: "0.75rem" }}
                                        >
                                            Order Summary
                                        </h6>

                                        {/* Cart Items */}
                                        <ul className="list-unstyled mb-0">
                                            {cart.map((item) => (
                                                <li
                                                    key={getId(item)}
                                                    className="d-flex align-items-center mb-3"
                                                >
                                                    {/* Thumbnail */}
                                                    {item.product_photo && (
                                                        <img
                                                            src={img_url + item.product_photo}
                                                            alt={getName(item)}
                                                            style={{
                                                                width: "52px",
                                                                height: "52px",
                                                                objectFit: "cover",
                                                                borderRadius: "8px",
                                                                marginRight: "12px",
                                                                flexShrink: 0,
                                                            }}
                                                        />
                                                    )}

                                                    {/* Name & qty */}
                                                    <div className="flex-grow-1">
                                                        <p
                                                            className="mb-0 text-uppercase"
                                                            style={{ fontSize: "0.8rem", color: "#e6c0c0", letterSpacing: "0.5px" }}
                                                        >
                                                            {getName(item)}
                                                        </p>
                                                        <small style={{ color: "#777" }}>
                                                            Qty: {item.quantity}
                                                        </small>
                                                    </div>

                                                    {/* Line total */}
                                                    <span style={{ color: "#c5a059", fontSize: "0.85rem", fontWeight: "bold" }}>
                                                        KES {(getPrice(item) * item.quantity).toLocaleString()}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <hr style={{ borderColor: "#333" }} />

                                        {/* Grand total */}
                                        <div className="d-flex justify-content-between">
                                            <strong style={{ color: "#fff", fontSize: "0.9rem" }}>Total</strong>
                                            <strong style={{ color: "#e4bd73", fontSize: "1rem" }}>
                                                KES {totalPrice.toLocaleString()}
                                            </strong>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={img_url + product.product_photo}
                                        alt={product.product_name}
                                        className='img-fluid h-100 w-100'
                                        style={{ objectFit: 'cover', minHeight: '400px' }}
                                    />
                                )}
                            </div>

                            {/* RIGHT — payment form */}
                            <div className="col-md-6 p-4 p-lg-5 bg-light">
                                <h6
                                    className="text-uppercase text-muted mb-1"
                                    style={{ letterSpacing: '2px' }}
                                >
                                    Secure Checkout
                                </h6>

                                <h2 className="fw-bold mb-3">
                                    {isCartCheckout
                                        ? `${cart.length} Item${cart.length > 1 ? "s" : ""}`
                                        : product.product_name}
                                </h2>

                                {!isCartCheckout && (
                                    <p className="text-muted mb-4">
                                        {product.product_description?.slice(0, 50)}...
                                    </p>
                                )}

                                {/* Amount */}
                                <div className="d-flex justify-content-between align-items-center mb-4 p-3" style={{ backgroundColor: "#f8f8f8" }}>
                                    <span className="text-dark">Total Amount</span>
                                    <span className="h4 mb-0 fw-bold" style={{ color: '#c5a059' }}>
                                        KES {Number(amountToPay).toLocaleString()}
                                    </span>
                                </div>

                                {/* Phone Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small text-uppercase" style={{ letterSpacing: "1px" }}>
                                            M-Pesa Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            className='form-control form-control-lg rounded-0'
                                            placeholder='2547XXXXXXXX'
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <small className="text-muted">Format: 2547XXXXXXXX (12 digits)</small>
                                    </div>

                                    {loading && <div className="mb-3 text-center"><Loader /></div>}
                                    {success && <div className="alert alert-success rounded-0 small">{success}</div>}
                                    {error && <div className="alert alert-danger rounded-0 small">{error}</div>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='btn btn-dark w-100 rounded-0 py-3 mt-3 text-uppercase'
                                        style={{ letterSpacing: '2px', backgroundColor: '#1a1a1a' }}
                                    >
                                        {loading ? "Processing..." : `Pay KES ${Number(amountToPay).toLocaleString()}`}
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