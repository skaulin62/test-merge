import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectorFilter, setCategory } from "../Redux/slices/filterSlice.ts";

export default React.memo(function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { filter } = useSelector(selectorFilter);

  useEffect(() => {
    setActiveIndex(filter);
  }, [filter]);
  const categories: String[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setActiveIndex(index);
                dispatch(setCategory(index));
              }}
              className={activeIndex === index ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
