export default function bigIntToFixed(
  n: bigint,
  divDecimals: number,
  endDecimals: number
): string {
  // Convert the bigint to a string
  let str = n.toString()

  // Calculate the position to place the decimal point for division
  let decimalPlace = str.length - divDecimals

  if (decimalPlace <= 0) {
    // If the decimal should go before the start of the number, pad with zeros
    let padding = '0'.repeat(-decimalPlace + 1)
    str = padding + str
    decimalPlace = 1
  }

  // Extract the whole and fractional parts after division
  let whole = str.slice(0, decimalPlace)
  let fraction = str.slice(decimalPlace)

  if (endDecimals === 0 && fraction === '0'.repeat(fraction.length)) {
    // No rounding needed for whole numbers
    return whole
  }

  // Add an extra digit for rounding
  fraction += '0'

  // Handle rounding by using the standard JavaScript Number type's rounding behavior
  let numForRounding = parseFloat(
    whole + '.' + fraction.slice(0, endDecimals + 1)
  )
  let roundedNumber = numForRounding.toFixed(endDecimals)

  return roundedNumber
}

// Examples
// console.log(bigIntToFixed(12345678901234567890123n, 18, 2)) // Output should be "12345.67"
// console.log(bigIntToFixed(1234567890123456789n, 18, 2)) // Output should be "1.23"
// console.log(bigIntToFixed(5000000000000000000n, 18, 2)) // Output should be "5.00"
// console.log(bigIntToFixed(4500000000000000000n, 18, 2)) // Output should be "4.50"
// console.log(bigIntToFixed(9999999999999999999n, 18, 2)) // Output should be "10.00"
// console.log(bigIntToFixed(9999999999999999999n, 0, 0)) // Output should be "9999999999999999999"
