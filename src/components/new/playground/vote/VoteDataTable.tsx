import formatBigInt from '@/utils/numberFormatting/formatBigInt'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

// Helper function to convert Unix timestamp to required date format
const convertUnixToFormattedDate = (unixTimestamp: number) => {
  const dateObj = new Date(unixTimestamp * 1000)
  const date = dateObj.toISOString().split('T')[0]
  const time = dateObj.toTimeString().split(' ')[0]
  const formattedDate = `${date} ${time} GMT`
  return formattedDate
}

type AABTProps = {
  allowance: bigint | undefined
  balance: bigint | undefined
  end1: bigint | undefined
  end2: bigint | undefined
  lockedBalance: bigint | undefined
}

export default function VoteDataTable({
  allowance,
  balance,
  end1,
  end2,
  lockedBalance,
}: AABTProps) {
  return (
    <table className="text-white min-w-full text-sm mt-2">
      <tbody>
        <tr>
          <td className="px-4 bg-backgroundMoreInteractive rounded-tl-md pt-[5px] font-semibold">
            Current Allowance
          </td>
          <td
            className="px-4 bg-backgroundMoreInteractive rounded-tr-md pt-[5px] text-accent"
            title={allowance?.toString() ?? ''}
          >
            {(allowance !== undefined
              ? formatBigInt(allowance) // 10n ** 18n
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
          <td className="px-4 bg-backgroundMoreInteractive pb-1 font-semibold">
            Current Balance
          </td>
          <td
            className="px-4 bg-backgroundMoreInteractive pb-1 text-accent"
            title={balance?.toString() ?? ''}
          >
            {(balance !== undefined
              ? formatBigInt(balance) // 10n ** 18n
              : undefined
            )?.toString() ?? 'connect wallet'}{' '}
            {balance !== undefined && balance > 0n ? (
              <span className="text-secondary">B-80-BAL-20-SGT</span>
            ) : (
              ``
            )}
          </td>
        </tr>

        <tr className="px-4 bg-backgroundInteractive">
          <td className="px-4 bg-backgroundMoreInteractive pb-1 font-semibold">
            Locked Balance
          </td>
          <td
            className="px-4 bg-backgroundMoreInteractive pb-1 text-accent"
            title={lockedBalance?.toString() ?? ''}
          >
            {(lockedBalance !== undefined
              ? formatBigInt(lockedBalance) // 10n ** 18n
              : undefined
            )?.toString() ?? 'connect wallet'}{' '}
            {lockedBalance !== undefined ? (
              <span className="text-secondary">B-80-BAL-20-SGT</span>
            ) : (
              ``
            )}
          </td>
        </tr>
        <tr className="px-4 bg-backgroundInteractive">
          <td className="px-4 bg-backgroundMoreInteractive pb-1 font-semibold">
            Locked End 1
          </td>
          <td className="px-4 bg-backgroundMoreInteractive pb-1 text-accent">
            {end1 ? convertUnixToFormattedDate(Number(end1)) : 'Not set'}
          </td>
        </tr>
        <tr className="px-4 bg-backgroundInteractive">
          <td className="px-4 bg-backgroundMoreInteractive rounded-bl-md pb-1 font-semibold">
            Locked End 2
          </td>

          <td className="px-4 bg-backgroundMoreInteractive rounded-br-md pb-1 text-accent">
            {end2 ? convertUnixToFormattedDate(Number(end2)) : 'Not set'}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
