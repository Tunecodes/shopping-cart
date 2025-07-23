import { useState } from "react";
import styles from "./cart-dialog.module.css";
import styled from "styled-components";

const Backdrop = styled.div`
  display: ${(props) => (props.cartOpen ? "block" : "none")};
`;

const Cart = styled.div`
  transform: ${(props) =>
    props.cartOpen ? "translateX(0)" : "translateX(100%)"};
`;


const CartDialog = ({ cartOpen, closeCart }) => {
  return (
    <>
      <Backdrop
        className={styles["backdrop"]}
        onClick={closeCart}
        cartOpen={cartOpen}
      />

      <Cart className={styles["cart"]} cartOpen={cartOpen}>
        <h2>Shopping Cart</h2>
        <div className={styles["items-con"]}></div>
        <h1></h1>
      </Cart>

    </>
  );
};


export default CartDialog;
