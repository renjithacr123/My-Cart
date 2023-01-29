import React from "react";
import "./style.css";

const WishList = ({ items }) => {
  return (
    <div>
      {" "}
      {items.map((pdt) => (
        <div class="wishlist">
          <img
            className="gallery_img1"
            draggable={false}
            style={{ width: "50%", height: "50%" }}
            src={pdt.url}
            key={`${pdt.id}`}
          />
        </div>
      ))}
    </div>
  );
};

export default WishList;
