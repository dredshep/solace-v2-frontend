import { VoteModal } from '../../generics/Modal'

function _Table({ data }: { data: typeof dummyData }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'min-content auto 1fr 1fr 1fr',
        gap: '8px 0',
      }}
      className="text-base font-semibold"
    >
      <div className="text-textSecondary px-4 text-xs font-bold">Network</div>
      <div className="text-textSecondary px-4 text-xs font-bold">Asset</div>
      <div className="text-textSecondary px-4 text-xs font-bold text-end">
        Next period votes
      </div>
      <div className="text-textSecondary px-4 text-xs font-bold text-end">
        My votes
      </div>
      <div></div> {/* Empty title for the 5th column */}
      {data.map((row, index) => (
        <>
          <div
            className="bg-backgroundInteractive p-4 flex items-center justify-center rounded-l"
            key={index}
          >
            <div className="bg-white rounded-full w-6 h-6"></div>{' '}
            {/* Placeholder for crypto icon */}
          </div>
          <div className="bg-backgroundInteractive p-4 flex items-center">
            <div className="relative w-12 h-9">
              <div className="bg-white rounded-full w-9 h-9 absolute left-0"></div>{' '}
              {/* Token icon 1 */}
              <div className="bg-textTertiary rounded-full w-9 h-9 absolute left-3"></div>{' '}
              {/* Token icon 2 */}
              <div className="bg-accent rounded-full w-4 h-4 absolute bottom-0 right-0"></div>{' '}
              {/* Badge-like protocol icon */}
            </div>
            <div className="ml-2">{row.assetName}</div> {/* Asset name */}
          </div>
          <div className="bg-backgroundInteractive p-4 flex items-center justify-end">
            {row.nextPeriodVotes.toFixed(2)}%
          </div>
          <div className="bg-backgroundInteractive p-4 flex items-center justify-end">
            {row.myVotes.toFixed(2)}%
          </div>
          <div className="bg-backgroundInteractive p-4 flex items-center justify-end rounded-r">
            <VoteModal>
              <button className="border-2 border-accent rounded bg-transparent text-accent px-8 py-2">
                Vote
              </button>
            </VoteModal>
          </div>
        </>
      ))}
    </div>
  )
}

// Example usage
const dummyData = [
  {
    assetName: 'B-ETH-STABLE-Uni-v2 / veUSDC',
    nextPeriodVotes: 12.34,
    myVotes: 56.78,
  },
  {
    assetName: 'Wrapped Bitcoin Cash / Something Else',
    nextPeriodVotes: 23.45,
    myVotes: 67.89,
  },
  // Repeat as needed
]
const repeatedData = Array(5).fill(dummyData).flat()
export default function Table() {
  return <_Table data={repeatedData} />
}
