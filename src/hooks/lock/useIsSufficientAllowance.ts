import { useEffect, useState } from 'react'
import { useAllowance } from './useAllowance'
import String0x from '@/constants/types/String0x'

interface UseIsSufficientAllowanceProps {
  requiredAmount: bigint
  owner: String0x
  spender: String0x
  tokenAddress: String0x
}

export function useIsSufficientAllowance({
  requiredAmount,
  owner,
  spender,
  tokenAddress,
}: UseIsSufficientAllowanceProps): boolean {
  const [isSufficient, setIsSufficient] = useState(false)
  const allowance = useAllowance({ owner, spender, tokenAddress })

  useEffect(() => {
    if (typeof allowance === 'bigint' && typeof requiredAmount === 'bigint') {
      setIsSufficient(allowance >= requiredAmount)
    }
  }, [allowance, requiredAmount])

  return isSufficient
}
