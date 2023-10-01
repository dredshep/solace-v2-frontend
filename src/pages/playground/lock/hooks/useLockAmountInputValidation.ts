import String0x from '@/constants/types/String0x'
import { useEffect, useState } from 'react'
import { useBalance, useAccount } from 'wagmi'

export const useLockAmountInputValidation = (poolAddress: String0x) => {
  const [inputAmount, setInputAmount] = useState('')
  const [isAmountValid, setIsAmountValid] = useState(false)
  const [reason, setReason] = useState<string | null>(null)
  const { address } = useAccount()

  const userBalance = useBalance({
    address: address,
    token: poolAddress,
  }).data?.value

  useEffect(() => {
    let validAmount = BigInt(0)
    try {
      validAmount = BigInt(inputAmount)
      setReason(null)
    } catch (error) {
      setIsAmountValid(false)
      setReason('Invalid number format')
      return
    }

    if (typeof userBalance === 'bigint') {
      if (validAmount <= userBalance && validAmount > 0n) {
        setIsAmountValid(true)
        setReason(null)
      } else {
        setIsAmountValid(false)
        setReason('Amount is not within your balance')
      }
    }
  }, [inputAmount, userBalance])

  return {
    inputAmount,
    setInputAmount,
    isAmountValid,
    reason,
  }
}
