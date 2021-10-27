/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "..";
import { fetchNfts } from "./action";
import useRefresh from '../../hooks/useRefresh'


export const usenfts = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(()=>{
    dispatch(fetchNfts())
  },[dispatch, fastRefresh])

  const { nfts } = useSelector((state)=>({
    nfts : state.nfts.data
  }))
  return { nfts }
}

