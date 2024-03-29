export type ReadTokenData = {
  constants: { name: string; symbol: string; decimals: number }
  address: { [chainId: number]: string }
}

export type ReadToken = {
  address: string
  name: string
  symbol: string
  decimals: number
  stablecoin?: boolean
}

export type TokenInfo = ReadToken & {
  balance: bigint
  price: number
}

export type PoolTokenInfo = TokenInfo & {
  poolBalance: bigint
}
