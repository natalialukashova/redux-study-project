import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  loadProducts,
  removeFromBasket,
  selectProducts,
} from "../shopSlice";
import styles from "../Shop.module.css";

export function Amount({ amount, onAdd, onRemove }) {
  return (
    <div className={styles.amount}>
      <button onClick={onRemove}>-</button>
      <span className={styles.amountValue}>{amount}</span>
      <button onClick={onAdd}>+</button>
    </div>
  );
}

export function ProductCard({ id, name, price, ...props }) {
  return (
    <article className={styles.item}>
      <h2>{name}</h2>
      <span className={styles.sku}>Артикул: {id}</span>
      <p>
        Цена: <span className={styles.price}>{price}</span>
      </p>
      <Amount {...props} />
    </article>
  );
}

export function Products() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <section className={styles.list}>
      {loading ? (
        <p>Товары загружаются</p>
      ) : (
        items.map((item) => (
          <ProductCard
            {...item}
            key={item.id}
            onAdd={() => dispatch(addToBasket(item.id))}
            onRemove={() => dispatch(removeFromBasket(item.id))}
          />
        ))
      )}
    </section>
  );
}
