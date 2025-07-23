import Navigation from "../navigation/Navigation";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import CartDialog from "../cart/CartDialog";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["home"]}>
      <Navigation />
      <main className={styles["container"]}>
        <div className={styles["quote-con"]}>
          <p className={styles["line1"]}>Quick, Simple, and Easy</p>
          <p className={styles["line2"]}>anything you need</p>
          <p className={styles["line3"]}> FFShop has it all </p>
          <button onClick={() => navigate("/shop")}> Shop Now </button>
        </div>
        <img src="https://img.freepik.com/free-photo/top-view-accessoires-travel-with-women-clothing-concept-white-mobilephone-watch-bag-hat-map-camera-necklace-trousers-sunglasses-white-wood-table_1921-106.jpg?semt=ais_hybrid&w=740"></img>
      </main>
      <div className={styles["footer-con"]}>hello </div>
    </div>
  );
};

export default Home;
