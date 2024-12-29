import { createSlice } from "@reduxjs/toolkit";

const savedCarts = JSON.parse(localStorage.getItem('carts')) || [
  {id: -1, name: 'White and Black', count: 1},
  {id: -2, name: 'Grey Yordan', count: 1}
];

let carts = createSlice({
  name: 'carts',
  initialState: savedCarts,
  reducers: {
    increaseCount(state, action) {
      const cartId = action.payload;
      const idx = state.findIndex(cart => cart.id === cartId);
      state[idx].count += 1;

      // localStorage 에 저장
      localStorage.setItem('carts', JSON.stringify(state));
    },

    decreaseCount(state, action) {
      const cartId = action.payload;
      const idx = state.findIndex(cart => cart.id === cartId);
      // 남은 개수가 없다면 state 에서 삭제
      if (state[idx].count === 1) {
        state.splice(idx, 1);
      } 
      else 
        state[idx].count -= 1;

      // localStorage 에 저장
      localStorage.setItem('carts', JSON.stringify(state));
    },

    addProduct(state, action) {
      const product = action.payload;
      const cartId = product.id;
      const idx = state.findIndex(cart => cart.id === cartId);

      // state 에 존재하지 않는다면 추가
      if (idx === -1) {
        state.push({
          id: product.id,
          name: product.title,
          count: 1
        })
      }
      else
        state[idx].count += 1;

      alert('장바구니에 담았슴다');

      // localStorage 에 저장
      localStorage.setItem('carts', JSON.stringify(state));
    }
  }
})

export const {increaseCount, decreaseCount, addProduct} = carts.actions
export default carts