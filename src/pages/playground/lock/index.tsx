import sepoliaDefaultPool from '@/constants/pools/sepoliaDefaultPool'
import { useAccount } from 'wagmi'
import { useLockIntoVotingEscrow } from '@/hooks/lock/useLockIntoVotingEscrow'
import { ValidatedInput } from '@/components/new/lockPlayground/ValidatedInput'
import useBlockTimestamp from '@/hooks/lock/useBlockTimestamp'
import { useEffect } from 'react'

export default function Lock() {
  const timestamp = useBlockTimestamp()
  const bigintTimestampUnix = BigInt(timestamp ?? 0n)
  const secondsInWeek = 604800n
  // Calculate the current week number, rounded down
  const currentWeekNumber = bigintTimestampUnix / secondsInWeek
  // Set unlock time for 20 weeks into the future
  const unlockTime = currentWeekNumber + 20n

  const { data, write, isLoading, isSuccess } = useLockIntoVotingEscrow({
    amount: 1000n,
    unlockTime,
    enabled: !!timestamp,
  })

  useEffect(() => {
    console.log('current week number: ', currentWeekNumber)
    console.log('unlock time: ', unlockTime)
  }, [currentWeekNumber, unlockTime])

  return (
    <div className="mx-4 flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md p-4 rounded-lg bg-backgroundInteractive shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-accent font-semibold">
            Voting Escrow Lock
          </h1>
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
        <div className="flex gap-4">
          <button
            onClick={() => write?.()}
            className="mt-4 w-64 px-4 py-2 bg-accentAction text-white rounded-lg hover:bg-accentActive transition duration-300 ease-in-out"
          >
            Create Lock
          </button>
          <div className="mt-4 text-center text-accent text-sm">
            {isLoading ? (
              <div className="text-accentWarning">Waiting for transaction…</div>
            ) : isSuccess ? (
              <div className="text-accentSuccess">Transaction successful!</div>
            ) : (
              <div className="text-white">
                Transaction hash:{<br />}
                {data?.hash || (
                  <span className="text-accentWarning">Not yet initiated</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
