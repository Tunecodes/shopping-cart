import Navigation from "../navigation/Navigation";
import { Item } from "./CartModal";

const Cart = () => {
  const items = allProducts();
  return (
    <>
      <Navigation />
    </>
  );
};

const allProducts = () => {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const raw = localStorage.getItem(key);
    try {
      items.push(JSON.parse(raw));
    } catch {
      items.push(raw);
    }
  }
  return items;
};
export default Cart;
