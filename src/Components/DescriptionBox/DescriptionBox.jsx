import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>An e-commerce websiter is an online platform that facilitates buying and selling of products or services over the internet serves as a virtual marketplace where businesses and individuals showcase their product, interact with customer and coduct transactions without the need for a pyshical presence. E-commerce websites have gained immense popularity due to their accessibility, and the global reach they offer.</p>
        <p>E-commerce websites typically display product or services as detailed descriptions, images, prices, sizes and color. Each product usually has its own dedication with relevant information.</p>
      </div>
    </div>
  );
}

export default DescriptionBox
