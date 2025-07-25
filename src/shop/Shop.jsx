import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import styles from "./shop.module.css";
import productStyle from "./product.module.css";
import PropTypes from "prop-types";
import styled from "styled-components";
import Footer from "../footer/Footer";

const AddedPopup = styled.div`
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  transform: ${(props) => (props.show ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease-in-out;
  width: 15rem;
  height: 5rem;
`;

const Shop = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error(`HTTP error: Status ${res.status}`);
        }
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return isLoading ? (
    <div className={styles["loading-con"]}>
      <div className={styles["loader"]}></div>
      <h2>Please Wait</h2>
    </div>
  ) : (
    <div>
      <Navigation />
      <main className={styles["container"]}>
        {data.map((product) => (
          <div className={styles["card"]} key={product.id}>
            <img src={product.image}></img>
            <div className={styles["card-info"]}>
              <h3>{product.title}</h3>
              <div className={styles["rating-con"]}>
                <StarRating rating={product.rating.rate} />
                <p>({product.rating.count})</p>
              </div>
              <div className={styles["buy-con"]}>
                <h4>${product.price}</h4>
                <button
                  onClick={() =>
                    navigate(`/shop/product/${product.id}`, {
                      state: { product },
                    })
                  }
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
        <Footer />
    </div>
  );
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const quantity = useRef(0);
  const location = useLocation();
  const item = location.state?.product;
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!item) {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!res.ok) {
            throw new Error(`HTTP error: Status ${res.status}`);
          }

          const data = await res.json();

          setProduct(data);
        } else {
          setProduct(item);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProduct();
  }, [id, item]);

  if (!product)
    return (
      <div className={styles["loading-con"]}>
        <div className={styles["loader"]}></div>
        <h2>Loading Product</h2>
      </div>
    );

  return (
    <>
      <Navigation />
      <AddedPopup show={showPopup}>
        <p className={productStyle["notification"]}>Sent to Cart</p>
      </AddedPopup>
      <div className={productStyle["container"]}>
        <img src={product.image}></img>
        <div>
          <h1>{product.title}</h1>
          <div className={productStyle["rating-con"]}>
            <StarRating rating={product.rating.rate} />
            <p>({product.rating.rate} product rating)</p>
          </div>
          <h4>Category: {product.category}</h4>
          <p className={productStyle["des"]}>{product.description}</p>
          <h2 className={productStyle["price"]}>$ {product.price}</h2>
          <div>
            Quantity:{" "}
            <input
              type="number"
              ref={quantity}
              defaultValue={1}
              step="1"
              min="1"
              max="100"
              style={{ paddingLeft: "5px" }}
            />
          </div>
          <div className={productStyle["button-con"]}>
            <button
              className={productStyle["buy"]}
              onClick={() => {
                addToCart(Number(quantity.current.value), product);
                navigate("/cart");
              }}
            >
              Buy
            </button>
            <button
              className={productStyle["cart"]}
              onClick={() => {
                addToCart(Number(quantity.current.value), product);
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 1500);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const addToCart = (quantity, product) => {
  const key = product.id;
  const existing = localStorage.getItem(key);

  if (!existing) {
    const newProduct = { ...product, quantity };
    localStorage.setItem(key, JSON.stringify(newProduct));
  } else {
    const parsed = JSON.parse(existing);
    parsed.quantity += quantity;
    localStorage.setItem(key, JSON.stringify(parsed));
  }

  window.dispatchEvent(new Event("cartUpdated"));
};

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push("★");
    } else if (i - rating <= 0.5) {
      stars.push("⯪");
    } else {
      stars.push("☆");
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {stars.map((star, index) => (
        <span key={index} className={styles["star"]}>
          {star}
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
};

export { Shop, Product };
