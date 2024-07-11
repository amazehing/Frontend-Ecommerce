import React from "react";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";

const SortOptions = ({ showOptions, toggleOptions, handleSort }) => {
  return (
    <div className="shopcategory-sort" onClick={toggleOptions}>
      <span>
        Sort by <img src={dropdown_icon} alt="" />
      </span>
      {showOptions && (
        <div className="sort-options">
          <button type="button" onClick={() => handleSort("lowest")}>
            Lowest Price
          </button>
          <button type="button" onClick={() => handleSort("highest")}>
            Highest Price
          </button>
        </div>
      )}
    </div>
  );
};

export default SortOptions;
