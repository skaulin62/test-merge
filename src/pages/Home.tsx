import React, { useCallback } from "react";
import { selects } from "../components/Sort.tsx";
import { useAxios } from "../hooks/useAxios.ts";
import { useCategory } from "../hooks/usePizzas.ts";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectorFilter, setParams } from "../Redux/slices/filterSlice.ts";
import { fetchPizzas, selectorPizzas } from "../Redux/slices/pizzasSlice.ts";
import qs from "qs";
import { useAppDispatch } from "../Redux/store.ts";
import {
  Sort,
  PizzaCard,
  Pagination,
  Categories,
  PizzaSkeletonCard,
} from "../components/components.ts";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { items, status } = useSelector(selectorPizzas);
  const { filter, sort, currentPage, searchValue } =
    useSelector(selectorFilter);
  const [type, setType] = React.useState<string>("number");

  const changeType = useCallback((type2: string) => {
    setType(type2);
  }, []);
  // me
  const [axiosPizzas, isLoadingPizzas, errorPizzas] = useAxios(
    async (page: number) => {
      // const response = await PizzaService.getAll(page);

      dispatch(fetchPizzas(page));
      // setPizzas(response.data);
    }
  );
  const sortedArr = useCategory([...items], sort, type, filter, searchValue);

  React.useEffect(() => {
    if (searchParams.size > 0) {
      const sort = selects.find((obj) => obj.sort === searchParams.get("sort"));

      dispatch(
        setParams({
          filter: Number(searchParams.get("filter")),
          currentPage: Number(searchParams.get("currentPage")),
          sort: sort || selects[0],
          searchValue: "",
        })
      );
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    //@ts-ignore
    axiosPizzas(currentPage);
  }, [currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sort: sort.sort,
      filter,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [sort.sort, filter, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort setType={changeType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <h2 style={{ padding: "60px 0", textAlign: "center" }}>
          Произошла ошибка 😥
        </h2>
      ) : status === "loading" ? (
        <div className="content__items">
          {[...Array(8)].map((_, index) => (
            <PizzaSkeletonCard key={index} />
          ))}{" "}
        </div>
      ) : (
        <div className="content__items">
          {" "}
          {sortedArr.map((item) => (
            <PizzaCard key={item.id} item={item} />
          ))}{" "}
        </div>
      )}

      <Pagination />
    </div>
  );
}
