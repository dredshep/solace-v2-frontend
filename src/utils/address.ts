import { getAddress } from 'viem'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function encodeAddresses(addresses: string[]): string {
  let encoded = '0x'
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i]
    if (address.length != 42 || address.substring(0, 2) != '0x') {
      throw new Error(`invalid address: ${address}`)
    }
    // 20 byte encoding of the address
    encoded += address.slice(2).toLowerCase()
  }
  return encoded
}
