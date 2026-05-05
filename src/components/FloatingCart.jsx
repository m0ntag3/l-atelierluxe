import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FloatingCart = ({ cart = [] }) => {
const navigate = useNavigate();
const [hovered, setHovered] = useState(false);

const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
const getPrice  = (item) => Number(item.product_cost || item.price || 0);
const getName   = (item) => item.product_name || item.name || "Unnamed Piece";
const getId     = (item) => item.product_id || item.id;

const totalPrice = cart.reduce((acc, item) => acc + getPrice(item) * item.quantity, 0);

return (
<div style={{ position: "fixed", bottom: "32px", left: "32px", zIndex: 1000 }}>

    {/* Hover Preview Panel */}
    {hovered && cart.length > 0 && (
    <div
        style={{
        position: "absolute",
        bottom: "68px",
        left: "0",
        width: "280px",
        backgroundColor: "#111",
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        color: "#fff",
        }}
    >
        <p
        className="text-uppercase mb-3"
        style={{ fontSize: "0.7rem", letterSpacing: "2px", color: "#aaa" }}
        >
        Cart Preview
        </p>

        {/* Item list — show max 4 */}
        {cart.slice(0, 4).map((item) => (
        <div
            key={getId(item)}
            className="d-flex justify-content-between align-items-center mb-2"
        >
            {/* Thumbnail */}
            {item.product_photo && (
            <img
                src={`https://collinspaul.alwaysdata.net/static/images/${item.product_photo}`}
                alt={getName(item)}
                style={{
                width: "36px",
                height: "36px",
                objectFit: "cover",
                borderRadius: "6px",
                marginRight: "10px",
                }}
            />
            )}

            {/* Name */}
            <span
            style={{ fontSize: "0.78rem", color: "#e6c0c0", flex: 1 }}
            className="text-truncate me-2"
            >
            {getName(item)}
            <span style={{ color: "#aaa" }}> ×{item.quantity}</span>
            </span>

            {/* Price */}
            <span style={{ fontSize: "0.78rem", color: "#c5a059", whiteSpace: "nowrap" }}>
            KES {(getPrice(item) * item.quantity).toLocaleString()}
            </span>
        </div>
        ))}

        {cart.length > 4 && (
        <p style={{ fontSize: "0.72rem", color: "#777", marginTop: "6px" }}>
            +{cart.length - 4} more item{cart.length - 4 > 1 ? "s" : ""}
        </p>
        )}

        <hr style={{ borderColor: "#333" }} />

        {/* Total */}
        <div className="d-flex justify-content-between mb-3">
        <strong style={{ fontSize: "0.8rem" }}>Total</strong>
        <strong style={{ color: "#e4bd73", fontSize: "0.8rem" }}>
            KES {totalPrice.toLocaleString()}
        </strong>
        </div>

        {/* Go to Cart button */}
        <button
        onClick={() => navigate("/cart")}
        className="btn w-100 rounded-0 py-2 text-uppercase"
        style={{
            backgroundColor: "#0b497c",
            color: "#fff",
            fontSize: "0.7rem",
            letterSpacing: "2px",
        }}
        >
        View Full Cart
        </button>
    </div>
    )}

    {/* Floating Button */}
    <div
    onClick={() => navigate("/cart")}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    title="View Cart"
    style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#0b497c",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        position: "relative",
    }}
    >
    <span className="material-symbols-outlined" style={{ fontSize: "1.6rem" }}>
        shopping_cart
    </span>

    {/* Badge */}
    {cartCount > 0 && (
        <span
        style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            backgroundColor: "#e4bd73",
            color: "#1a1a1a",
            borderRadius: "50%",
            fontSize: "0.6rem",
            fontWeight: "bold",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
        }}
        >
        {cartCount > 99 ? "99+" : cartCount}
        </span>
    )}
    </div>
</div>
);
};

export default FloatingCart;