import React from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../Contexts/SearchContext";
import { debounce } from "../../utils/debounce.ts";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../Redux/slices/filterSlice.ts";
export default function Search() {
  const [localSearchValue, setLocalSearchValue] = React.useState<string>("");
  const dispatch = useDispatch();

  const searchValueRef = React.useRef<HTMLInputElement>(null);

  function onClearSearch() {
    setLocalSearchValue("");
    dispatch(setSearchValue(""));
    searchValueRef?.current?.focus?.();
  }

  const debounceSearch = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  function setWithDebounce(val: string) {
    setLocalSearchValue(val);

    debounceSearch(val);
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.svg}
        fill="#000000"
        height="200px"
        width="200px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488.4 488.4"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
      <input
        ref={searchValueRef}
        value={localSearchValue}
        onChange={(e) => setWithDebounce(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {localSearchValue && (
        <svg
          onClick={() => onClearSearch()}
          className={styles.close}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 50 50"
        >
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
        </svg>
      )}
    </div>
  );
}
