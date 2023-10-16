import { useContractRead } from 'wagmi'
import String0x from '@/constants/types/String0x'
import votingEscrowAbi from '@/abis/votingEscrowAbi' // Make sure to include the votingEscrow ABI
import sgtDeployments from '@/constants/contracts/sgtDeployments'
import useBlockTimestamp from '../lock/useBlockTimestamp'

interface useTotalSGTProps {
  blockTimestamp: bigint
  enabled?: boolean
}

export function useTotalSGT({
  blockTimestamp,
  enabled = true,
}: useTotalSGTProps): {
  amount: bigint | undefined
  refetch: () => void
} {
  const { data: lockedBalanceData, refetch } = useContractRead({
    abi: votingEscrowAbi,
    address: sgtDeployments.SGT,
    functionName: 'totalSupply',
    args: [blockTimestamp],
    enabled,
  })

  return {
    amount: lockedBalanceData ?? undefined,
    refetch,
  }
}
