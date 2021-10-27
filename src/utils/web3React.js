import { ethers } from 'ethers'
import { InjectedConnector } from '@web3-react/injected-connector'


const POLLING_INTERVAL = 12000
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
export const injected = new InjectedConnector({ supportedChainIds: [chainId] })

export const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}

