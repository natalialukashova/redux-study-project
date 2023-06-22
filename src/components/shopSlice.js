import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fakeFetch, PRODUCTS } from "../components/Api/Api";

const SLICE = "shop";
const initalState = {
  products: [],
  status: false,
  basket: [],
  total: 0,
};

export const loadProducts = createAsyncThunk("counter/fetchCount", async () => {
  const response = await fakeFetch(PRODUCTS);
  return response.map((item) =>
    Object.assign({}, item, {
      amount: 0,
    })
  );
});

export const shopSlice = createSlice({
  name: SLICE,
  initalState,
  reducers: {
    setProduct: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
    setBasket: (state, action) => {
      state.basket = action.payload.items;
      state.total = action.payload.total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { setBasket, setProduct } = shopSlice.actions;

export const selectProducts = (state) => ({
  items: state[SLICE].products,
  loading: state[SLICE].status === "loadong",
});

export const selectProduct = (id) => (state) => {
  return state[SLICE].products.filter((item) => item.id === id).pop();
};

export const selectBasket = (state) => ({
  items: state[SLICE].basket,
  total: state[SLICE].total,
});

export const addToBasket = (id) => (dispatch, getState) => {
  const product = selectProduct(id)(getState());
  if (!product) return;

  const basket = selectBasket(getState());
  dispatch(
    setProduct(
      Object.assign({}, product, {
        amount: product.amount + 1,
      })
    )
  );

  const items = new Set([...basket.items, product.id]);
  dispatch(
    setBasket({
      items: [...items.values()],
      total: basket.total + product.price,
    })
  );
};

export const removeFromBasket = (id) => (dispatch, getState) => {
  const product = selectProduct(id)(getState());
  if (!product) return;

  const basket = selectBasket(getState());
  if (basket.items.includes(product.id)) {
    dispatch(
      setProduct(
        Object.assign({}, product, {
          amount: product.amount - 1,
        })
      )
    );
    const items = new Set([...basket.items]);
    if (product.amount === 1) {
      items.delete(product.id);
    }
    dispatch(
      setBasket({
        items: [...items.values()],
        total: basket.total - product.price,
      })
    );
  }
};

export default shopSlice.reducer;