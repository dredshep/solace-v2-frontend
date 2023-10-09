import sepoliaDefaultPool from '@/constants/pools/sepoliaDefaultPool'
import { ValidatedInput } from '@/components/new/lockPlayground/ValidatedInput'
import classnames from 'classnames'
import Image from 'next/image'
import { useVote } from '@/hooks/vote/useVote'
import useBlockTimestamp from '@/hooks/lock/useBlockTimestamp'
import { useEffect, useState } from 'react'
import PlaygroundDataTable, {
  PlaygroundDataTableRowData,
} from '@/components/new/generics/PlaygroundDataTable'
import convertUnixToFormattedDate from '@/utils/dateFormatting/convertUnixToFormattedDate'

export default function Vote() {
  const timestamp = useBlockTimestamp()
  const [nextTime, setNextTime] = useState<bigint | null>(null)

  const { data, write, isLoading, isSuccess } = useVote({
    gaugeAddress: sepoliaDefaultPool.address,
    userWeight: 1000n,
  })
  useEffect(() => {
    const secondsInWeek = 604800n
    const bigintTimestampUnix = timestamp ?? 0n
    if (timestamp !== null) {
      // Perform Solidity-like math to calculate the next time
      const nextTimeCalculated =
        ((bigintTimestampUnix + secondsInWeek) / secondsInWeek) * secondsInWeek
      setNextTime(nextTimeCalculated)
    }
  }, [timestamp])

  const abbreviatePoolAddress = (poolAddress: string) => {
    return `${poolAddress.slice(0, 6)}...${poolAddress.slice(-4)}`
  }
  const rows = [
    // {
    //   label: 'Pool Address',
    //   value: abbreviatePoolAddress(sepoliaDefaultPool.address),
    //   title: sepoliaDefaultPool.address,
    //   type: 'string',
    // },
    // {
    //   label: 'User Weight',
    //   value: '100%',
    //   type: 'string',
    // },
    {
      label: 'Voting Period End',
      title: nextTime?.toString() ?? '',
      type: 'bigint',
      value: nextTime?.toString() ?? 0n,
      formatFunc: (val: bigint) => {
        return convertUnixToFormattedDate(Number(val))
      },
    },
  ] as PlaygroundDataTableRowData[]

  return (
    <div className="mx-4 flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md p-4 rounded-lg bg-backgroundInteractive shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-accent font-semibold">Vote</h1>
          <div className="p-1 rounded-full bg-accent">
            <svg
              className="w-6 h-6 text-background"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 6a3 3 0 00-6 0v4h6V6zM2 6a10.978 10.978 0 013.528-8C2.68 1.33 0 4.78 0 9a9 9 0 0018 0c0-4.22-2.68-7.67-5.528-9A10.978 10.978 0 012 6h13V5H2v1z"></path>
            </svg>
          </div>
        </div>

        <ValidatedInput poolAddress={sepoliaDefaultPool.address} />
        {/* <AllowanceAndBalanceTable
          allowance={allowance}
          balance={balance?.value}
          end1={unixEndDate}
          end2={unixEndDate2}
          lockedBalance={lockedBalance}
        /> */}
        <PlaygroundDataTable rows={rows} />
        <div className="flex mt-4 gap-4">
          {
            <button
              onClick={() => write?.()}
              disabled={isLoading}
              className={classnames(
                'px-4 py-2 w-64',
                'text-white rounded-lg font-semibold',
                isLoading
                  ? 'bg-gray-500'
                  : 'bg-accentAction hover:bg-accentActive'
              )}
            >
              {isLoading ? (
                <span className="flex gap-2 items-center">
                  <Image
                    src="/assets/svg/loading.svg"
                    alt="loading"
                    className="inline-block w-5 h-5"
                    width={30}
                    height={20}
                  />
                  Voting...
                </span>
              ) : (
                'Emit vote'
              )}
            </button>
          }
        </div>
      </div>
    </div>
  )
}
