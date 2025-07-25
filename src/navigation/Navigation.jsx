import styles from "./navigation.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { CartModal } from "../cart/CartModal";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const route = location.pathname;

  return (
    <>
      <nav className={styles["nav-container"]}>
        <h1
          className={styles["title"]}
          as="button"
          onClick={() => navigate("/")}
        >
          FFShop
        </h1>
        <div className={styles["nav"]}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link
            onClick={route !== "/cart" ? () => setCartOpen(true) : undefined}
            className={styles["cart"]}
          >
            {" "}
            <p className={styles["totalCount"]}>
              {localStorage.length ? totalProducts(localStorage.length) : ""}
            </p>
          </Link>
        </div>
      </nav>
      <CartModal cartOpen={cartOpen} closeCart={() => setCartOpen(false)} />
    </>
  );
};

const totalProducts = (products) => {
  let total = 0;
  for (let i = 0; i < products; i++) {
    const key = localStorage.key(i);
    const product = JSON.parse(localStorage.getItem(key));
    total += product.quantity;
  }
  return total;
};

export default Navigation;
