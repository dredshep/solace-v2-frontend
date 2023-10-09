import bigIntToFixed from './bigIntToFixed'

function findAndApplySuffix(len: number, numStr: string): string {
  let roundedNumber = parseFloat(numStr)

  if (len > 24) {
    return `${(roundedNumber / 1e24).toFixed(2)}Qn`
  }
  if (len > 15 && len <= 18) {
    return `${(roundedNumber / 1e15).toFixed(2)}Qd`
  }
  if (len > 12 && len <= 15) {
    return `${(roundedNumber / 1e12).toFixed(2)}T`
  }
  if (len > 9 && len <= 12) {
    return `${(roundedNumber / 1e9).toFixed(2)}B`
  }
  if (len > 6 && len <= 9) {
    return `${(roundedNumber / 1e6).toFixed(2)}M`
  }
  if (len > 3 && len <= 6) {
    return `${(roundedNumber / 1e3).toFixed(2)}K`
  }
  return numStr
}

export default function formatBigInt(
  num: bigint,
  decimals: number = 18
): string {
  const originalLen = num.toString().length - decimals // length from the original bigint
  const str = bigIntToFixed(num, decimals, 2) // already rounded by bigIntToFixed
  return findAndApplySuffix(originalLen, str)
}

// Examples
// console.log(formatBigNumber(12125732531840124323461n)) // Expected output: "12.13K"
// console.log(formatBigNumber(1000000000000000000n)) // Expected output: "1.00"
// console.log(formatBigNumber(1000000000000000000000n)) // Expected output: "1.00K"
// console.log(formatBigNumber(1000000000000000000000000n)) // Expected output: "1.00M"
// console.log(formatBigNumber(1000000000000000000000000000n)) // Expected output: "1.00B"
