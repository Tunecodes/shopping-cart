import styles from "./navigation.module.css";
import { useNavigate, Link } from "react-router-dom";
import CartDialog from "../cart/CartDialog";
import { useState } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false)
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
          <Link onClick={() => setCartOpen(true)}> </Link>
        </div>
      </nav>
      <CartDialog cartOpen={cartOpen} closeCart={() => setCartOpen(false)}/>
    </>
  );
};

export default Navigation;
