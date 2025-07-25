const getAllProducts = () => {
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

const subTotal = (items) => {
  return items
    .map((item) => [item.price, item.quantity])
    .reduce((acc, curr) => acc + curr[0] * curr[1], 0)
    .toFixed(2);
};

export { getAllProducts, subTotal };
