import React from "react";
import { useAxios } from "../hooks/useAxios.ts";
import PizzaService from "../API/PizzaService.ts";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../Redux/store.ts";
import { fetchPizzas } from "../Redux/slices/pizzasSlice.js";

export default function PizzaPage() {
  const { id } = useParams();

  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({ imageUrl: "", title: "", price: 0 });

  const [axiosPizza, isLoadingPizza, errorPizza] = useAxios(
    async (idItem: string) => {
      const response = await PizzaService.getItem(idItem);
      setItem(response.data);
    }
  );

  React.useEffect(() => {
    //@ts-ignore
    axiosPizza(id);
  }, []);

  return (
    <div className="container">
      {errorPizza ? (
        <h2>Пицца не загрузилась 😅</h2>
      ) : isLoadingPizza ? (
        <h2>Загрузка пиццы 😁</h2>
      ) : (
        <>
          <img src={item.imageUrl} />
          <h2>
            {id} || {item.title}
          </h2>
          <p>Стоимость: {item.price}</p>
        </>
      )}
    </div>
  );
}
