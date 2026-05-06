import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {

const navigate = useNavigate();
// Helper to get the correct field regardless of API shape
const getPrice = (item) => Number(item.product_cost || item.price || 0);
const getName  = (item) => item.product_name || item.name || "Unnamed Piece";
const getId    = (item) => item.product_id   || item.id;

// Calculate total in KES
const totalPrice = cart.reduce((acc, item) => {
return acc + (getPrice(item) * item.quantity);
}, 0);

const removeFromCart = (id) => {
setCart(cart.filter(item => getId(item) !== id));
};

return (
<div
    className="container-fluid px-4 py-5"
    style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "#fff" }}
>
    <h2
    className="text-uppercase text-center mb-5 fw-light"
    style={{ letterSpacing: "4px", color: "#9c8128" }}
    >
    Your Cart
    </h2>

    {cart.length === 0 ? (
    <p className="text-center" style={{ color: "#fff"}}>Your cart is currently empty.</p>
    ) : (
    <div className="row justify-content-center">

        {/* Cart Items */}
        <div className="col-md-7">
        <ul className="list-group list-group-flush">
            {cart.map((item) => (
            <li
                key={getId(item)}
                className="list-group-item d-flex justify-content-between align-items-center px-0"
                style={{ backgroundColor: "transparent", borderColor: "#333", color: "#fff" }}
            >
                {/* Product Image */}
                {item.product_photo && (
                <img
                    src={`https://collinspaul.alwaysdata.net/static/images/${item.product_photo}`}
                    alt={getName(item)}
                    style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "14px"
                    }}
                />
                )}

                {/* Name & Quantity */}
                <div className="flex-grow-1">
                <h6 className="my-0 text-uppercase" style={{ color: "#e6c0c0", letterSpacing: "1px" }}>
                    {getName(item)}
                </h6>
                <small style={{ color: "#aaa" }}>
                    Quantity: {item.quantity}
                </small>
                </div>

                {/* Line Total */}
                <span className="me-3" style={{ color: "#c5a059", fontWeight: "bold", whiteSpace: "nowrap" }}>
                KES {(getPrice(item) * item.quantity).toLocaleString()}
                </span>

                {/* Remove Button */}
                <button
                className="btn btn-sm border-0"
                style={{ color: "#e05c5c", fontSize: "1rem" }}
                onClick={() => removeFromCart(getId(item))}
                title="Remove item"
                >
                ✕
                </button>
            </li>
            ))}
        </ul>
        </div>

        {/* Summary Box */}
        <div className="col-md-4 mt-4 mt-md-0">
        <div
            className="card border shadow-sm"
            style={{ backgroundColor: "#111", borderColor: "#333 !important", borderRadius: "0" }}
        >
            <div className="card-body p-4">
            <h5
                className="card-title text-uppercase mb-4"
                style={{ fontSize: "0.85rem", letterSpacing: "3px", color: "#fff" }}
            >
                Summary
            </h5>

            {/* Per-item breakdown */}
            {cart.map((item) => (
                <div key={getId(item)} className="d-flex justify-content-between mb-2">
                <span style={{ color: "#aaa", fontSize: "0.85rem" }}>
                    {getName(item)} × {item.quantity}
                </span>
                <span style={{ color: "#c5a059", fontSize: "0.85rem" }}>
                    KES {(getPrice(item) * item.quantity).toLocaleString()}
                </span>
                </div>
            ))}

            <hr style={{ borderColor: "#333" }} />

            <div className="d-flex justify-content-between mb-2">
                <span style={{ color: "#aaa" }}>Subtotal</span>
                <span style={{ color: "#fff" }}>KES {totalPrice.toLocaleString()}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
                <span style={{ color: "#aaa" }}>Shipping</span>
                <span className="text-success">FREE</span>
            </div>

            <hr style={{ borderColor: "#333" }} />

            <div className="d-flex justify-content-between mb-4">
                <strong style={{ color: "#fff" }}>Total (KES)</strong>
                <strong style={{ color: "#e4bd73", fontSize: "1.1rem" }}>
                KES {totalPrice.toLocaleString()}
                </strong>
            </div>

            <button
            onClick={() => navigate("/makepayment", { state: { cart, totalPrice } })}
            className="btn w-100 rounded-0 py-2 text-uppercase"
            style={{
                backgroundColor: "#0b497c",
                color: "#fff",
                fontSize: "0.75rem",
                letterSpacing: "2px"
            }}
            >
            Checkout
            </button>
            </div>
        </div>
        </div>

    </div>
    )}
</div>
);
};

export default Cart;