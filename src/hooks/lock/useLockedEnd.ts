import { useContractRead } from 'wagmi'
import String0x from '@/constants/types/String0x'
import votingEscrowAbi from '@/abis/votingEscrowAbi' // Make sure to include the votingEscrow ABI

interface UseLockedEndProps {
  userAddress: String0x
  contractAddress: String0x
  enabled?: boolean
}

/**
 * Hook that returns the locked end date for a user's locked tokens.
 * @param {UseLockedEndProps} props - The properties to configure the hook.
 * @param {String0x} props.userAddress - The address of the user.
 * @param {String0x} props.contractAddress - The address of the contract.
 * @param {boolean} [props.enabled=true] - Whether the hook is enabled to run by default.
 * @returns {{ data: { unixEndDate: number } | null, refetch: () => void }} - The parsed data and a refetch function.
 */
export function useLockedEnd({
  userAddress,
  contractAddress,
  enabled = true,
}: UseLockedEndProps) {
  const { data, refetch } = useContractRead({
    abi: votingEscrowAbi,
    address: contractAddress,
    functionName: 'locked_end',
    args: [userAddress],
    enabled,
  })

  return { unixEndDate: data, refetch }
}
