import { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import styles from "./shop.module.css";
import PropTypes from "prop-types";

const Shop = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
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
              <StarRating
                rating={product.rating.rate}
                count={product.rating.count}
              />
              <div className={styles["buy-con"]}>
                <h4>${product.price}</h4>
                <button>Buy</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

const StarRating = ({ rating, count }) => {
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
      <div style={{ marginLeft: "15px" }}>({count})</div>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  count: PropTypes.number,
};

export default Shop;
