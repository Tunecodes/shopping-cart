import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, subTotal } from "./utlity";

import styles from "./cart-modal.module.css";
import styled from "styled-components";

const Backdrop = styled.div`
  display: ${(props) => (props.cartOpen ? "block" : "none")};
`;

const Cart = styled.div`
  transform: ${(props) =>
    props.cartOpen ? "translateX(0)" : "translateX(100%)"};
`;

const CartModal = ({ cartOpen, closeCart }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);
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
  return (
    <>
      <Backdrop
        className={styles["backdrop"]}
        onClick={closeCart}
        cartOpen={cartOpen}
      />

      <Cart className={styles["cart"]} cartOpen={cartOpen}>
        <h2>Shopping Cart</h2>
        <div className={styles["items-con"]}>
          {items.length === 0 ? (
            <div className={styles["empty"]}>
              <h1></h1>
              <h2>Empty Cart</h2>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id}>
                <Item product={item} items={items} setItems={setItems} />
              </div>
            ))
          )}
        </div>
        <div className={styles["subtotal-con"]}>
          <div className={styles["subtotal"]}>
            <h1>Subtotal</h1>
            <h3>$ {subTotal(items)}</h3>
          </div>
          <div className={styles["subtotal-buttons"]}>
            <button
              className={styles["continue-button"]}
              onClick={() => {
                navigate("/shop");
                closeCart();
              }}
            >
              Continue Shopping
            </button>
            <button
              className={styles["checkout-button"]}
              onClick={() => navigate("/cart")}
            >
              {" "}
              Checkout{" "}
            </button>
          </div>
        </div>
      </Cart>
    </>
  );
};

const Item = ({ product, items, setItems }) => {
  const count = product.quantity;
  const [quantity, setQuantity] = useState(0);
  return (
    <div className={styles["item"]}>
      <img src={product.image} alt={product.title}></img>{" "}
      <div className={styles["item-info"]}>
        <h4>{product.title}</h4>
        <button
          className={styles["delete-item"]}
          onClick={() => {
            const updatedItems = items.filter((item) => item.id !== product.id);
            setItems(updatedItems);
            localStorage.removeItem(product.id);
          }}
        >
          X
        </button>
        <input
          className={styles["qauantity"]}
          value={count}
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            setQuantity(newQuantity);
            const updatedItem = { ...product, quantity: newQuantity };
            const key = product.id;
            localStorage.setItem(key, JSON.stringify(updatedItem));
            window.dispatchEvent(new Event("cartUpdated"));
          }}
          type="number"
          min={1}
          step={1}
        />
        <div>
          $
          {Number((quantity * product.price).toFixed(2)) ||
            (product.quantity * product.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export { CartModal, Item };
