import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectorFind } from "../../Redux/slices/cardSlice.ts";
import { Link } from "react-router-dom";
import { Item } from "../../Redux/slices/cardSlice.ts";
import { Item as ItemCart } from "../../Redux/slices/pizzasSlice.js";
type Props = {
  item: ItemCart;
};

const PizzaCard: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();

  const [sizeIndex, setSizeIndex] = useState<Number>(0);
  const [typeIndex, setTypeIndex] = useState<Number>(0);
  const typeNames: String[] = ["Тонкое", "Традиционное"];
  const cartItem = useSelector(selectorFind(item.id));
  const count = cartItem ? cartItem.count : 0;
  function addCart() {
    const cart: Item = {
      id: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      type: String(typeNames[Number(typeIndex)]),
      size: item.sizes[Number(sizeIndex)],
      category: item.category,
      rating: item.rating,
      count: 0,
    };

    dispatch(addItem(cart));
  }

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${item.id}`}>
          <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{item.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {item.types.map((type: number, index: number) => (
              <li
                onClick={() => setTypeIndex(index)}
                className={index === typeIndex ? "active" : ""}
                key={index}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {item.sizes.map((size: number, index: number) => (
              <li
                className={sizeIndex === index ? "active" : ""}
                onClick={() => setSizeIndex(index)}
                key={index}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {item.price} ₽</div>
          <div className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span onClick={() => addCart()}>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
