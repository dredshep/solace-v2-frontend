import String0x from '@/constants/types/String0x'
import { useContractRead, useAccount, erc20ABI } from 'wagmi'

interface UseAllowanceProps {
  owner: String0x
  tokenAddress: String0x
  spender: String0x
  enabled?: boolean
}

export function useAllowance({
  owner,
  tokenAddress,
  spender,
  enabled,
}: UseAllowanceProps) {
  const { data: allowance, refetch } = useContractRead({
    abi: erc20ABI,
    address: tokenAddress,
    functionName: 'allowance',
    args: [owner, spender],
    enabled: enabled ?? true,
  })

  return { allowance, refetch }
}
