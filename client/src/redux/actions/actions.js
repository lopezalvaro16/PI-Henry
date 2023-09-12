import {
  ADD_TO_FAVORITES,
  REMOVE_FAVORITE,
  SORT,
  FILTER,
  RESET,
} from "./action-types";
import axios from "axios";

export const addFavorite = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      dispatch({
        type: ADD_TO_FAVORITES,
        payload: data,
      });
    } catch (error) {
      console.error("Error during addFavorite:", error);
    }
  };
};

export const removeFavorite = (id) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      dispatch({
        type: REMOVE_FAVORITE,
        payload: data,
      });
    } catch (error) {
      console.error("Error during removeFavorite:", error);
    }
  };
};

export function filterByGender(gender) {
  return {
    type: FILTER,
    payload: gender,
  };
}

export function sortById(order) {
  return {
    type: SORT,
    payload: order,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
