import styles from "./navigation.module.css";
import { useNavigate, Link } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles["nav-container"]}>
      <h1 className={styles["title"]} as="button" onClick={() => navigate("/")}>FFShop</h1>
      <div className={styles["nav"]}><Link to="/">Home</Link><Link to="/shop">Shop</Link><Link> </Link></div>
    </nav>
  );
};

export default Navigation;
