import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REQUEST_ITEM,
  CART_FAIL_ITEM
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REQUEST_ITEM });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_FAIL_ITEM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
