import axios from "axios";
import { Item } from "../Redux/slices/pizzasSlice";

export default class PizzaService {
  static async getAll(currentPage: String) {

    // return response from the mockapi api
    const response = await axios.get<Item[]>(
      "https://6560dbff83aba11d99d1a040.mockapi.io/pizza/items?limit=4&page=" +
        currentPage
    );
    console.log(typeof response.data)
    return response;
  }
  static async getItem(id: String) {
    const response = await axios.get<Item>(
      "https://6560dbff83aba11d99d1a040.mockapi.io/pizza/items/" + id
    );
    return response;
  }
}
