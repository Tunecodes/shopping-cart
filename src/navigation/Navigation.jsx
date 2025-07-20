import styles from "./navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles["nav-container"]}>
      <h1 className={styles["title"]}>FFShop</h1>
      <div className={styles["nav"]}><a>Home</a><a>Shop</a><a>   </a></div>
    </nav>
  );
};

export default Navigation;
