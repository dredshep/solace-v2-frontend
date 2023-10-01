import String0x from './String0x'

export default interface Pool {
  id: String0x
  name: string
  address: String0x
  nextPeriodVotes: number | undefined
  myVotes: number | undefined
  network: {
    name: string // aura, kovan, mainnet, ropsten, rinkeby
    chainId: number
    imageUrl: string
  }
  tokens: {
    name: string
    symbol: string
    address: String0x
    decimals: number
    imageUrl: string
  }[]
}
