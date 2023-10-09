import React, { useEffect } from 'react'
import { useAllowance } from '@/hooks/lock/useAllowance'
import { useBalance, useAccount } from 'wagmi'
import sgtDeploymentAddresses from '@/constants/contracts/sgtDeployments'

type AABTProps = {
  allowance: bigint | undefined
  balance: bigint | undefined
}

export default function AllowanceAndBalanceTable({
  allowance,
  balance,
}: AABTProps) {
  const { address } = useAccount()

  useEffect(() => {
    if (allowance !== null && typeof allowance !== 'bigint') {
      console.log(
        'allowance is not a bigint, it is: ',
        typeof allowance,
        'value: ',
        allowance
      )
    }
  }, [allowance])

  return (
    <table className="text-white min-w-full text-sm mt-2">
      <tbody>
        <tr className="">
          <td className="px-4 bg-backgroundMoreInteractive rounded-tl-md pt-[5px] font-semibold">
            Current Allowance
          </td>
          <td className="px-4 bg-backgroundMoreInteractive rounded-tr-md pt-[5px] text-accent">
            {(allowance !== undefined
              ? allowance / 10n ** 18n
              : undefined
            )?.toString() ?? 'connect wallet'}{' '}
            {allowance && allowance > 0n ? (
              <span className="text-secondary">B-80-BAL-20-SGT</span>
            ) : (
              ``
            )}
          </td>
        </tr>
        <tr className="px-4 bg-backgroundInteractive">
          <td className="px-4 bg-backgroundMoreInteractive rounded-bl-md pb-1 font-semibold">
            Current Balance
          </td>
          <td className="px-4 bg-backgroundMoreInteractive rounded-br-md pb-1 text-accent">
            {(balance !== undefined
              ? balance / 10n ** 18n
              : undefined
            )?.toString() ?? 'connect wallet'}{' '}
            {balance !== undefined && balance > 0n ? (
              <span className="text-secondary">B-80-BAL-20-SGT</span>
            ) : (
              ``
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
