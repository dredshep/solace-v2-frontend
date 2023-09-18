import { sepolia } from 'wagmi/chains'
import { Network } from '../types'

export const Sepolia: Network = {
  ...sepolia,
  local: {
    name: 'Sepolia',
    chainId: 11155111,
    supportedTxTypes: [0, 2],
    isTestnet: true,
    logo: '/assets/svg/networks/ethereum-logo.svg',
    explorer: {
      name: 'Sepolia Testnet - Etherscan',
      key: '',
      url: 'https://sepolia.etherscan.io/',
      apiUrl: 'https://api-sepolia.etherscan.io/api',
      excludedContractAddrs: [],
    },
    config: {
      generalContracts: {},
      specialContracts: {},
      generalFeatures: {},
      specialFeatures: {},
    },
  },
}
