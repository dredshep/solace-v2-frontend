import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import votingEscrowAbi from '@/abis/votingEscrowAbi'
import sgtDeploymentAddresses from '@/constants/contracts/sgtDeployments'

type useLockIntoVotingEscrowProps = {
  amount: bigint
  unlockTime: bigint
}

export function useLockIntoVotingEscrow({
  amount,
  unlockTime,
}: useLockIntoVotingEscrowProps) {
  const { config } = usePrepareContractWrite({
    address: sgtDeploymentAddresses.VotingEscrow,
    abi: votingEscrowAbi,
    functionName: 'create_lock',
    /**
     * @notice Deposit `_value` tokens for `msg.sender` and lock until `_unlock_time`
     * @param _value Amount to deposit
     * @param _unlock_time Epoch time when tokens unlock, rounded down to whole weeks
     */
    args: [
      // B-80SGT-20BAL amount of pool BPT tokens to lock
      amount,
      // time in seconds to lock for
      unlockTime,
    ],
  })

  const { data, write } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash })

  return {
    data,
    write,
    isLoading,
    isSuccess,
  }
}
