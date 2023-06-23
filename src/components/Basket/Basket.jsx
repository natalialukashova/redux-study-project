import React, { useState } from "react";
import styles from "../Shop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Amount } from "../Products/Products";
import { declOfNum } from "../../lib/utils";
import {
  addToBasket,
  removeFromBasket,
  selectBasket,
  selectProduct,
} from "../shopSlice";

const formatMessage = (amount, price) => {
  const goods = declOfNum(amount, ["товар", "товара", "товаров"]);
  return `В корзине ${amount} ${goods} на сумму ${price}₽`;
};

export function BasketItem({ id }) {
  const dispatch = useDispatch();
  const { name, amount } = useSelector(selectProduct(id));

  return (
    <div>
      <span>{name}</span>
      <Amount
        amount={amount}
        onAdd={() => dispatch(addToBasket(id))}
        onRemove={() => dispatch(removeFromBasket(id))}
      />
    </div>
  );
}

export function Basket() {
  const { items, total } = useSelector(selectBasket);
  const [opened, setOpened] = useState(false);

  return (
    <div className={styles.basketContainer}>
      <button onClick={() => setOpened(!opened)}>
        {formatMessage(items.length, total)}
      </button>
      {opened ? (
        <div className={styles.basketContent}>
          {items.map((id) => (
            <BasketItem key={id} id={id} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
