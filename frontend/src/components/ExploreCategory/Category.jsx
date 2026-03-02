import React from "react";
import "./Category.css";

const Category = ({
  categoryName,
  imgUrl,
  numberOfItems,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`category-card d-flex align-items-center p-3 ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <div className="category-image me-3">
        <img src={imgUrl} alt={categoryName} />
      </div>

      <div>
        <h6 className="text-white mb-1">{categoryName}</h6>
        <p className="text-white-50 mb-0 small">
          {numberOfItems} Items
        </p>
      </div>

      {isSelected && <div className="active-dot"></div>}
    </div>
  );
};

export default Category;