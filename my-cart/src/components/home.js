import React, { useState, useEffect } from "react";
import ProductComponent from "./product";
import WishList from "./wishList";
import { BsFillHeartFill } from "react-icons/bs";
import "./style.css";

const App = () => {
  const [itemsInWishlist, setItemsInWishList] = useState([]);
  const [showList, setShowWishList] = useState(false);
  const [allProductsInWishList, setAllPdtsInWishlist] = useState([]);
  const [allProducts, setAllProducts] = useState(null);
  const [noOfItemsInWishList, setnoOfItemsInWishList] = useState(0);

  const fetchData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setAllProducts(myJson.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showWishList = () => {
    if (itemsInWishlist.length > 0) {
      setShowWishList(true);
      itemsInWishlist.map((pdtId) =>
        allProducts.filter((item) => {
          const statusActiveArr = item.id == pdtId;
          if (statusActiveArr) {
            setAllPdtsInWishlist((allProductsInWishList) => [
              ...allProductsInWishList,
              item,
            ]);
          }
        })
      );
    }
  };

  const handleChange = (arg, type) => {
    setItemsInWishList((itemsInWishlist) => [...itemsInWishlist, arg]);
    if (type == "add") {
      setnoOfItemsInWishList(noOfItemsInWishList + 1);
    } else {
      setnoOfItemsInWishList(noOfItemsInWishList - 1);
    }
  };
  const goToHomePage = () => {
    setShowWishList(false);
    //  setItemsInWishList((itemsInWishlist) => [...itemsInWishlist, arg]);
  };

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        {showList && (
          <button
            className="button-add"
            style={{ fontFamily: "cursive" }}
            onClick={() => {
              goToHomePage();
            }}
          >
            Home
          </button>
        )}
        <button
          disabled={showList ? true : false}
          style={{ textAlign: "right", fontFamily: "cursive" }}
          onClick={() => {
            showWishList();
          }}
        >
          <BsFillHeartFill />
          {noOfItemsInWishList}
        </button>
      </div>
      <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>
        The Fashion Hub
      </h1>
      {!showList && (
        <div className="carousal-div">
          <ProductComponent handleChange={handleChange} />
        </div>
      )}
      {showList && (
        <div className="carousal-div">
          <WishList items={allProductsInWishList.slice(-noOfItemsInWishList)} />
        </div>
      )}
    </div>
  );
};

export default App;
