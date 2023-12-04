import { Item } from "../Redux/slices/cardSlice";

export  function getCartFromLS() {
    const lS = localStorage.getItem('cart');

    return lS  ? JSON.parse(lS) as Item[] : []
}
export function changeTotalPrice(items: Item[]) {
    const total: number = items.reduce(
        (acc: number, item) => acc + item.price * item.count,
        0
      );
      return total;
}

export  function removeCartItemFromLS(item: Item[]) {
    const lS = localStorage.getItem('cart');

    return lS  ? JSON.parse(lS) : []
}