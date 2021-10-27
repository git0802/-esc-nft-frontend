/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "..";
import { fetchItemsCreated, fetchMyNFTs } from "./action";
import useRefresh from '../../hooks/useRefresh'

export const useOwnNfts = (library) => {
  const { fastRefresh  } =  useRefresh()
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchItemsCreated(library))
  },[dispatch, library, fastRefresh])
  
  const { items } = useSelector((state)=>({
    items : state.mynfts.owneddata
    
  }))
  return { items }
}

export const useSellingNfts = (library) => {
  const { fastRefresh  } =  useRefresh()
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchMyNFTs(library))
  },[dispatch, library,fastRefresh])

  const { items } = useSelector((state)=>({
    items : state.mynfts.sellingdata
  }))
  return { items }
}

