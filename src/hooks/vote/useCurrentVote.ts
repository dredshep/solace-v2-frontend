import { useContractRead } from 'wagmi'
import String0x from '@/constants/types/String0x'
import votingEscrowAbi from '@/abis/votingEscrowAbi' // Make sure to include the votingEscrow ABI

interface UseLockedBalanceProps {
  userAddress: String0x
  contractAddress: String0x
  enabled?: boolean
}

/**
 * Hook to get the locked balance data for a user from a voting escrow contract.
 * @param {UseLockedBalanceProps} props - The properties object.
 * @param {String0x} props.userAddress - The user's Ethereum address.
 * @param {String0x} props.contractAddress - The contract's Ethereum address.
 * @param {boolean} [props.enabled=true] - Whether the hook is enabled to run by default.
 * @returns {{ data: LockedBalanceData | null, refetch: () => void }} - The parsed locked balance data and a function to refetch the data.
 */
export function useLockedBalance({
  userAddress,
  contractAddress,
  enabled = true,
}: UseLockedBalanceProps) {
  const { data: lockedBalanceData, refetch } = useContractRead({
    abi: votingEscrowAbi,
    address: contractAddress,
    functionName: 'locked',
    args: [userAddress],
    enabled,
  })

  let parsedData = null

  if (lockedBalanceData !== undefined) {
    const { amount, end } = lockedBalanceData
    parsedData = {
      amount,
      unixEndDate: end,
    }
  }

  return {
    amount: parsedData?.amount,
    unixEndDate: parsedData?.unixEndDate,
    refetch,
  }
}
