import Pool from '../types/pool'

// export default interface Pool {
//   id: string
//   name: string
//   address: string
//   nextPeriodVotes: number | undefined
//   myVotes: number | undefined
//   network: {
//     name: string // aura, kovan, mainnet, ropsten, rinkeby
//     chainId: number
//     imageUrl: string
//   }
//   tokens: {
//     name: string
//     symbol: string
//     address: string
//     decimals: number
//     imageUrl: string
//   }[]
// }

export default {
  id: '0x76ddf9dbde56360d514a06a54d58977f77f176ca00020000000000000000002d',
  name: 'B-80SGT-20WETH',
  address: '0x76ddf9dbde56360d514a06a54d58977f77f176ca',
  nextPeriodVotes: undefined,
  myVotes: undefined,
  network: {
    name: 'sepolia',
    chainId: 11155111,
    imageUrl: 'https://0xkyc.id/blockchains/ethereum-logo.png',
  },
  tokens: [
    {
      name: 'SGT',
      symbol: 'SGT',
      address: '0x2691eB285be76e43755bD05A6b7BeE808202AC20',
      decimals: 18,
      imageUrl:
        'https://uploads-ssl.webflow.com/62bc249472e59c7058c4e2ea/64a189cdd68ad17859321af8_Vectors-Wrapper.svg',
    },
    {
      name: 'BAL',
      symbol: 'BAL',
      address: '0xaD023F6B2e8490fFd51066A7f1e6C086877b27E4',
      decimals: 18,
      imageUrl:
        'https://assets.coingecko.com/coins/images/11683/large/Balancer.png?1592792958',
    },
  ],
} as Pool
