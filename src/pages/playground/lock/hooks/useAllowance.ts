import String0x from '@/constants/types/String0x'
import { useEffect, useState } from 'react'
import { useContractRead, useAccount, erc20ABI } from 'wagmi'

interface UseAllowanceProps {
  tokenOwner: String0x
  spender: String0x
}

export function useAllowance({
  tokenOwner,
  spender,
}: UseAllowanceProps): bigint | null {
  const { data: allowance } = useContractRead({
    abi: erc20ABI,
    address: tokenOwner,
    functionName: 'allowance',
    args: [tokenOwner, spender],
    enabled: !!tokenOwner,
  })

  return allowance as bigint | null
}
