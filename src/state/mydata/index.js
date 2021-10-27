import { createSlice } from "@reduxjs/toolkit";

const initialStete = {
  owneddata : [],
  sellingdata : []
}

export const mynfts =  createSlice({
  name: 'mynfts',
  initialState: initialStete,
  reducers: {
    getOwnedNfts :(state, action)=>{
      const items =  action.payload;
      state.owneddata = items
    },
    getSellingNfts :(state, action)=>{
      const items =  action.payload;
      state.sellingdata = items
    }
  }

})


export const { getOwnedNfts, getSellingNfts }  = mynfts.actions

export default mynfts.reducer