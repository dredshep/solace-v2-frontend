import { useEffect, useState } from 'react'
import { useAllowance } from './useAllowance'
import String0x from '@/constants/types/String0x'

interface UseIsSufficientAllowanceProps {
  requiredAmount: bigint
  tokenOwner: String0x
  spender: String0x
}

export function useIsSufficientAllowance({
  requiredAmount,
  tokenOwner,
  spender,
}: UseIsSufficientAllowanceProps): boolean {
  const [isSufficient, setIsSufficient] = useState(false)
  const allowance = useAllowance({ tokenOwner, spender })

  useEffect(() => {
    if (typeof allowance === 'bigint' && typeof requiredAmount === 'bigint') {
      setIsSufficient(allowance >= requiredAmount)
    }
  }, [allowance, requiredAmount])

  return isSufficient
}
