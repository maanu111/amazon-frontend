import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  userinfo: null,
  orders: [],
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else state.products.push(action.payload);
    },
    increamentQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },

    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = status;
      }
    },
    setUser: (state, action) => {
      state.userinfo = action.payload;
    },
    logoutUser: (state) => {
      state.userinfo = null;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  decrementQuantity,
  increamentQuantity,
  placeOrder,
  updateOrderStatus,
  setUser,
  logoutUser,
} = amazonSlice.actions;
export default amazonSlice.reducer;
