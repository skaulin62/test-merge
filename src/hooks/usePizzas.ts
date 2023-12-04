import { useMemo } from "react";
import { Item } from "../Redux/slices/pizzasSlice.ts";
import { Sort } from "../Redux/slices/filterSlice.ts";
import { ObjectType } from "typescript";

interface IFilters {
  id: keyof Item; // <-- "id" | "filter1" | "filter2"
  title: string;
}


export function useSort(array: Item[], sort: Sort, type: String) {
  
  const field = sort.sort as keyof Item;
  const sortedArray = useMemo(() => {
    let sorted: Item[] = [];

    if (type === "number") {
      if (sort.title.includes("(asc)")) {
        sorted = array.sort((objA, objB) => objA[field] - objB[field]);
      } else {
        sorted = array.sort((objA, objB) => objB[field] - objA[field]);
      }
    } else {
      if (sort.title.includes("(asc)")) {
        sorted = array.sort((objA, objB) =>
          objA[field].localeCompare(objB[field])
        );
      } else {
        sorted = array.sort((objA, objB) =>
          objB[field].localeCompare(objA[field])
        );
      }
    }

    return sorted;
  }, [array, sort]);
  return sortedArray;
}
export function useSearch(array: Item[], searchValue: string) {
  const searchedArray = useMemo(() => {
    if (searchValue)
      return array.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    return array;
  }, [searchValue, array]);
  return searchedArray;
}

export function useCategory(array: Item[], sort: Sort, type: string, category: number, searchValue: string) {
  const sortedArray = useSort(array, sort, type);
  const filteredArray = useMemo(() => {
    if (category === 0) {
      return sortedArray;
    }
    return sortedArray.filter((item) => item.category === category);
  }, [array, category, sort]);
  return useSearch(filteredArray, searchValue);
}
