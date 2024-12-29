import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: 'user',
  initialState: {name: 'kim', age: 20},
  reducers: {
    setName(state) {
      state.name = 'park'
    },
    increaseAge(state, action) {
      state.age += action.payload
    },
    fun2() {
      return 1;
    }
  }
    
})

export const { setName, increaseAge, fun2 } = user.actions

export default user