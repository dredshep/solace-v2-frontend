import { useContractRead } from 'wagmi'
import String0x from '@/constants/types/String0x'
import votingEscrowAbi from '@/abis/votingEscrowAbi' // Make sure to include the votingEscrow ABI
import sgtDeployments from '@/constants/contracts/sgtDeployments'

interface useVeSGTBalanceProps {
  userAddress: String0x
  enabled?: boolean
}

export function useVeSGTBalance({
  userAddress,
  enabled = true,
}: useVeSGTBalanceProps) {
  const { data: lockedBalanceData, refetch } = useContractRead({
    abi: votingEscrowAbi,
    address: sgtDeployments.VotingEscrow,
    functionName: 'balanceOf',
    args: [userAddress],
    enabled,
  })

  return {
    amount: lockedBalanceData ?? undefined,
    refetch,
  }
}
