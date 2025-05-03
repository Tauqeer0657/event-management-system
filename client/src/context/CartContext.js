// context/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  carts: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.carts.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          carts: state.carts.map(item =>
            item.id === action.payload.id ? { ...item, qnty: item.qnty + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          carts: [...state.carts, { ...action.payload, qnty: 1 }],
        };
      }
    }

    case 'REMOVE_TO_CART':
      return {
        ...state,
        carts: state.carts.filter(item => item.id !== action.payload),
      };

    case 'REMOVE_SINGLE_ITEM':
      return {
        ...state,
        carts: state.carts.map(item =>
          item.id === action.payload.id && item.qnty > 1
            ? { ...item, qnty: item.qnty - 1 }
            : item
        ),
      };

    case 'EMPTY_CART':
      return {
        ...state,
        carts: [],
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
