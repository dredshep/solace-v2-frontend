import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  erc20ABI,
} from 'wagmi'
import erc20Abi from '@/abis/erc20Abi' // Make sure to include the ERC20 ABI
import sgtDeploymentAddresses from '@/constants/contracts/sgtDeployments'
import String0x from '@/constants/types/String0x'

type UseApproveTokenProps = {
  amount: bigint
  owner: String0x
  spender: String0x
  enabled?: boolean
}

export function useApproveToken({
  amount,
  owner,
  spender,
  enabled = true,
}: UseApproveTokenProps) {
  const { config } = usePrepareContractWrite({
    address: sgtDeploymentAddresses['B-80-BAL-20-SGT'], // Token address
    abi: erc20ABI,
    functionName: 'approve',
    args: [
      spender, // Address to be approved
      amount, // Amount to approve
    ],
    enabled,
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
