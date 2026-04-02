import React, { useState } from "react"; 
import "../css/category.css";

const Categories = ({ onCategorySelect }) => {
const categories = [
"All",
"Watches",
"Necklaces",
"Colognes",
"IceChains",
"Rings",
];

const [activeCategory, setActiveCategory] = useState("All");

const handleClick = (category) => {
setActiveCategory(category);
onCategorySelect(category); // notify parent
};

return (
<div className="categories-section">
    <h2 className="category-title">Browse by Category</h2>

    <div className="categories-container">
    {categories.map((category, index) => (
        <button
        key={index}
        className={`category-btn ${
            activeCategory === category ? "active" : ""
        }`}
        onClick={() => handleClick(category)}
        >
        {category}
        </button>
    ))}
    </div>
</div>
);
};

export default Categories;