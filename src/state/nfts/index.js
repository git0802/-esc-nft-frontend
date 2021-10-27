import { createSlice } from "@reduxjs/toolkit";

const initialStete = {
  data : []
}

export const nfts =  createSlice({
  name: 'nfts',
  initialState: initialStete,
  reducers: {
    getNfts :(state, action)=>{
      const items =  action.payload;
      state.data = items
    }
  }

})


export const { getNfts }  = nfts.actions

export default nfts.reducer