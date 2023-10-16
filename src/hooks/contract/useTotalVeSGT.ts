import { useContractRead } from 'wagmi'
import String0x from '@/constants/types/String0x'
import votingEscrowAbi from '@/abis/votingEscrowAbi' // Make sure to include the votingEscrow ABI
import sgtDeployments from '@/constants/contracts/sgtDeployments'
import useBlockTimestamp from '../lock/useBlockTimestamp'

interface useTotalVeSGTProps {
  blockTimestamp: bigint
  enabled?: boolean
}

export function useTotalVeSGT({
  blockTimestamp,
  enabled = true,
}: useTotalVeSGTProps): {
  amount: bigint | undefined
  refetch: () => void
} {
  const { data: lockedBalanceData, refetch } = useContractRead({
    abi: votingEscrowAbi,
    address: sgtDeployments.VotingEscrow,
    functionName: 'totalSupply',
    args: [blockTimestamp],
    enabled,
  })

  return {
    amount: lockedBalanceData ?? undefined,
    refetch,
  }
}
