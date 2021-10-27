import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import nftsReducer from './nfts';
import mynftsReducer from './mydata';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    nfts: nftsReducer,
    mynfts: mynftsReducer
  },
  middleware: [...getDefaultMiddleware({thunk: true})]
})  


export const useAppDispatch = () => useDispatch()

export default store