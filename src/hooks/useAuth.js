import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'

import { useAppDispatch } from '../state'
import { injected } from '../utils/web3React'
import { setupNetwork } from '../utils/wallet'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { chainId, activate, deactivate } = useWeb3React()

  const login = useCallback(()=>{
    if(injected) {
      activate(injected, async(error)=>{
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(injected)
          }
        } else { 
            console.error('Provider error')
        }
      })
    } else {
      console.error('Unable to find connector')
    }
  },[activate])
  const logout = useCallback(()=>{
    deactivate()
  },[deactivate])

  return  { login, logout} 
};

export default useAuth