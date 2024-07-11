import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";
import SortOptions from "../Components/SortOptions"; // Zorg dat het pad klopt

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const sortProducts = (sortBy) => {
    switch (sortBy) {
      case "lowest":
        return all_product
          .filter((item) => item.category === props.category)
          .sort((a, b) => a.new_price - b.new_price);
      case "highest":
        return all_product
          .filter((item) => item.category === props.category)
          .sort((a, b) => b.new_price - a.new_price);
      default:
        return all_product.filter((item) => item.category === props.category);
    }
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const sortedProducts = sortProducts(sortBy);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <SortOptions
          showOptions={showOptions}
          toggleOptions={toggleOptions}
          handleSort={handleSort}
        />
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
