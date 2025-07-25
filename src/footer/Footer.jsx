import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["footer-con"]}>
        <h3>© 2025 FakeStore. All Rights Reserved.</h3>
        <p>A Project from The Odin Project</p>
      </div>
    </div>
  );
};

export default Footer;
