import React, { useState } from "react";
import "./style.css";
import Carousel from "react-elastic-carousel";
import images from "../data.json";

const ProductComponent = ({ handleChange }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imgUrl, setCurrentUrl] = useState(null);
  const [pdtId, setCurrentPdtId] = useState(null);
  const [price, setCurrentItemPrice] = useState(null);
  const [info, setCurrentItemInfo] = useState(null);
  const [title, setCurrentItemTitle] = useState(null);
  const [itemsInWishlist, setItemsInWishList] = useState([]);
  let [wishListProducts, setWishListProducts] = useState({});

  const selectItem = (img) => {
    setShowDetails(!showDetails);
    setCurrentUrl(img.url);
    setCurrentPdtId(img.id);
    setCurrentItemPrice(img.price);
    setCurrentItemInfo(img.info);
    setCurrentItemTitle(img.title);
  };

  const addToWishList = (item) => {
    wishListProducts[item] = { inWishList: true };
    setItemsInWishList((itemsInWishlist) => [...itemsInWishlist, item]);
    setWishListProducts = () => {
      wishListProducts[item].inWishList = true;
    };
    handleChange(item, "add");
  };
  const removeFromWishList = (item) => {
    delete wishListProducts[item];
    setItemsInWishList((itemsInWishlist) => [...itemsInWishlist.slice(0, 1)]);
    handleChange(item, "delete");
  };

  const categories = [
    { id: 1, title: "Dress" },
    { id: 2, title: "Sandals" },
    { id: 3, title: "Bags" },
  ];

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <div>
      {showDetails && (
        <div>
          <div class="column">
            <div>
              <h2>{title}</h2>
            </div>
            <div>
              <img className="gallery_img1" src={imgUrl} alt="product" />
            </div>
          </div>
          <div class="column2">
            <h4>
              <strong>
                Price : <span>$</span>
                {price}
              </strong>
            </h4>
            <p>{info}</p>

            <div>
              <button
                className="button-add"
                onClick={() => {
                  setShowDetails(false);
                }}
              >
                <strong> View All</strong>
              </button>
              <button
                className="button-add"
                onClick={() => {
                  wishListProducts[pdtId]
                    ? removeFromWishList(pdtId)
                    : addToWishList(pdtId);
                }}
              >
                {" "}
                <strong>
                  {wishListProducts[pdtId] && wishListProducts[pdtId].inWishList
                    ? "Remove from WishList"
                    : "Add to WishList"}
                </strong>
              </button>
            </div>
          </div>
        </div>
      )}

      {!showDetails &&
        categories.map((categ) => (
          <div className="App">
            <h3 style={{ textAlign: "center", fontFamily: "cursive" }}>
              {categ.title}
            </h3>
            <Carousel
              breakPoints={breakPoints}
              className="carousel-height"
              enableAutoPlay
              autoPlaySpeed={1500}
            >
              {categ.title == "Dress" &&
                images.data.map(
                  (image) =>
                    image.category == "Dresses" && (
                      <div>
                        <button>
                          <img
                            className="gallery_img"
                            draggable={false}
                            style={{ width: "50%", height: "50%" }}
                            src={image.url}
                            onClick={() => {
                              selectItem(image);
                            }}
                            key={`${image.id}`}
                          />
                        </button>
                      </div>
                    )
                )}

              {categ.title == "Sandals" &&
                images.data.map(
                  (image) =>
                    image.category == "Sandals" && (
                      <div>
                        <button>
                          <img
                            className="gallery_img"
                            draggable={false}
                            style={{ width: "50%", height: "50%" }}
                            src={image.url}
                            onClick={() => {
                              selectItem(image);
                            }}
                            key={`${image.id}`}
                          />
                        </button>
                      </div>
                    )
                )}

              {categ.title == "Bags" &&
                images.data.map(
                  (image) =>
                    image.category == "Bags" && (
                      <div>
                        <button>
                          <img
                            className="gallery_img"
                            draggable={false}
                            style={{ width: "50%", height: "50%" }}
                            src={image.url}
                            onClick={() => {
                              selectItem(image);
                            }}
                            key={`${image.id}`}
                          />
                        </button>
                      </div>
                    )
                )}
            </Carousel>
          </div>
        ))}
    </div>
  );
};
export default ProductComponent;
