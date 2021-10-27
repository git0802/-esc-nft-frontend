export const setupNetwork = async () => {
  const provider = window.ethereum;
  if(provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          }
        ]
      })
      return true
    } catch( error) {
      console.error('failed to setup the network in metamask', error)
    }
  } else {
    console.error("Can't find metamask")
    return false
  }
}