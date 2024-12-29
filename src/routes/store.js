import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from '../store/userSlice'
import carts from '../store/carts'


let stocks = createSlice({
  name: 'stocks',
  initialState: [10, 11, 12]
})

export default configureStore({
  reducer: { 
    user : user.reducer,
    stocks: stocks.reducer,
    carts: carts.reducer
  }
}) 