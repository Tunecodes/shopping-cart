import { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { getAllProducts, subTotal } from "./utlity";
import { Item } from "./CartModal";
import styles from "./cart.module.css";
import Footer from "../footer/Footer";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);
  const tax = Math.floor(Number(subTotal(items)) * 0.0625 * 100) / 100;
  const shipping = (10).toFixed(2);
  const total = (Number(subTotal(items)) + tax + Number(shipping)).toFixed(2);

  useEffect(() => {
    setItems(getAllProducts());
  }, [renderFlag]);

  useEffect(() => {
    const handleUpdate = () => {
      setRenderFlag((prev) => !prev);
    };
    window.addEventListener("cartUpdated", handleUpdate);
    return () => window.removeEventListener("cartUpdated", handleUpdate);
  }, []);
  useEffect(() => setItems(getAllProducts()), []);
  return (
    <>
      <Navigation />

      {items.length === 0 ? (
        <div className={styles["empty"]}>
          <h1></h1>
          <h2>Empty Cart</h2>
        </div>
      ) : (
        <div className={styles["main-container"]}>
          <div className={styles["container"]}>
            <div className={styles["products-con"]}>
              {items.map((item) => (
                <div key={item.id}>
                  <Item product={item} items={items} setItems={setItems} />
                </div>
              ))}
            </div>
            <div className={styles["checkout-con"]}>
              <h2>Summary</h2>
              <div className={styles["summary"]}>
                <div>
                  <p>Subtotal</p>
                  <p>${subTotal(items)}</p>
                </div>
                <div>
                  <p>Estimated Tax</p>
                  <p>${tax}</p>
                </div>
                <div>
                  <p>Estimated Shipping and Handling</p>
                  <p>${shipping}</p>
                </div>
                <div>
                  <h3>Total</h3>
                  <h3>${total}</h3>
                </div>
              </div>
              <button className={styles["pay"]}>Pay</button>
            </div>
          </div>
            <Footer />
        </div>
      )}
    </>
  );
};

export default Cart;
