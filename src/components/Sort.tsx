import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectorFilter, setSortObj } from "../Redux/slices/filterSlice.ts";

type Sort = {
  title: string;
  sort: string;
};

export const selects: Sort[] = [
  {
    title: "популярности (asc)",
    sort: "rating",
  },
  {
    title: "популярности (desc)",
    sort: "rating",
  },
  {
    title: "цене (asc)",
    sort: "price",
  },
  {
    title: "цене (desc)",
    sort: "price",
  },
  {
    title: "алфавиту (asc)",
    sort: "title",
  },

  {
    title: "алфавиту (desc)",
    sort: "tit2le",
  },
];

type Props = {
  setType: (type: string) => void;
};

const Sort: React.FC<Props> = ({ setType }) => {
  const dispatch = useDispatch();
  const { sort } = useSelector(selectorFilter);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const index = selects.findIndex((select) => select.title === sort.title);
    setSelectedIndex(index);
  }, [sort]);

  function clickSelect(index: number) {
    if (selects[index].sort === "title") setType("string");
    else setType("number");

    dispatch(setSortObj(selects[index]));
    setSelectedIndex(index);
    setIsShow(!isShow);
  }

  React.useEffect(() => {
    const handlePopup = (event: MouseEvent) => {
      const _event = event as MouseEvent & { composedPath(): Node[] };
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setIsShow(false);
        console.log("outside");
      }
    };
    document.body.addEventListener("click", handlePopup);
    return () => {
      document.body.removeEventListener("click", handlePopup);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsShow(!isShow)}>
          {selects[selectedIndex].title}
        </span>
      </div>
      <div className={isShow ? "sort__popup visible" : "sort__popup"}>
        <ul>
          {selects.map((select, index) => (
            <li
              key={index}
              onClick={() => clickSelect(index)}
              className={index === selectedIndex ? "active" : ""}
            >
              {select.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
