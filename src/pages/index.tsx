import VeSGTBanner from '@/components/new/VeSGTBanner'
import classNames from 'classnames'

function LeftThingy() {
  return (
    <div
      className={classNames(
        // colors
        'text-white',
        // sizes
        'w-full md:max-w-4xl xl:max-w-sm 2xl:w-auto 2xl:max-w-none',
        // flex
        'flex flex-col items-center sm:items-start lg:flex-row lg:items-end xl:items-start xl:flex-col gap-10'
      )}
    >
      <div className="">
        <h1 className="text-2xl font-medium text-accent mb-6 leading-[43.20px] text-center sm:text-start">
          veSGT
        </h1>
        <div className="text-4xl font-bold leading-10 mb-9 text-center sm:text-start">
          Extra earnings <br />& voting power
        </div>
        <ul className="text-medium font-medium leading-7 flex flex-col items-center sm:items-start">
          <li>{'\u2013'} Boost liquidity mining yield up to 2.5x</li>
          <li>{'\u2013'} Vote to direct liquidity mining emissions</li>
          <li>{'\u2013'} Earn your share of protocol revenue</li>
        </ul>
      </div>
      {/* interactive button Get veSGT */}
      <div className="h-12 gap-6 inline-flex">
        <div className="px-4 py-3 bg-accent rounded items-center gap-1 flex">
          <div className="text-center text-contrastWithAccent text-lg font-semibold">
            Get veSGT
          </div>
        </div>
        <div className="px-4 py-3 rounded border border-neutral-50 border-opacity-70 items-center gap-1 flex">
          <div className="text-center text-neutral-50 text-lg font-semibold">
            Learn more
          </div>
        </div>
      </div>
    </div>
  )
}

function DashBox(props: {
  title: string
  mainValue: string
  subValue?: string
  onClick?: () => void
  verticalPadding?: 'Bigger' | 'Smaller'
  grayTone?: 'Light' | 'Dark'
}) {
  const { title, mainValue, subValue, onClick, verticalPadding, grayTone } =
    props

  return (
    <div
      className={classNames(
        'flex justify-between items-center gap-2 group rounded px-4',
        {
          'cursor-pointer px-4': onClick,
          'py-6': verticalPadding === 'Bigger',
          'py-2': verticalPadding === 'Smaller',
          'py-4': !verticalPadding,
          'bg-backgroundInteractive': grayTone === 'Light',
          'bg-backgroundSurface':
            grayTone === undefined ? true : grayTone === 'Dark',
        }
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-3">
        <div className="text-xs text-white leading-none font-medium">
          {title}
        </div>
        <div className="text-lg font-bold text-white leading-[25.20px]">
          {mainValue}
        </div>
        {subValue && (
          <div className="text-xs text-textTertiary leading-none font-medium">
            {subValue}
          </div>
        )}
      </div>
      {onClick && (
        <div className="text-4xl font-bold text-textTertiary group-hover:text-textPrimary">
          +
        </div>
      )}
    </div>
  )
}

function InfoGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <DashBox
        title="My veSGT"
        mainValue="123,785"
        subValue="16.19% of all veSGT"
      />
      <DashBox
        title="SGT locked"
        mainValue="21,444,320"
        subValue="34.87% SGT supply"
      />
      <DashBox
        title="My boost"
        mainValue="15,154,896"
        subValue="2.8 years average lock"
      />
      <DashBox
        title="My B-80SGT-20WETH"
        mainValue="$0.00"
        subValue="0"
        onClick={() => {}}
        grayTone="Light"
        verticalPadding="Bigger"
      />
      <DashBox
        title="My locked  B-80SGT-20WETH"
        mainValue="$3,584.12"
        subValue="0"
        onClick={() => {}}
        grayTone="Light"
        verticalPadding="Bigger"
      />
      <DashBox
        title="Locked Until"
        mainValue="15 Apr 2024"
        subValue="107 Days "
        onClick={() => {}}
        grayTone="Light"
        verticalPadding="Bigger"
      />
    </div>
  )
}

function Table({ data }: { data: typeof dummyData }) {
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
          <div className="bg-backgroundInteractive p-4 flex items-center justify-center rounded-l">
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
            <button className="border-2 border-accent rounded bg-transparent text-accent px-8 py-2">
              Vote
            </button>
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

export default function VeSGT() {
  return (
    <div className="flex flex-col gap-16 px-4 lg:px-12 text-white">
      <div className="flex flex-col xl:flex-row gap-16 items-center">
        <LeftThingy />
        <VeSGTBanner />
      </div>
      <InfoGrid />
      <div className="flex flex-col gap-4">
        <h3>Markets</h3>
        <div className="flex gap-6">
          <DashBox
            title="My unallocated votes"
            mainValue="235"
            grayTone="Light"
            verticalPadding="Bigger"
          />
          <DashBox
            title="Voting period ends"
            mainValue="1d : 15h : 2m : 47s"
            grayTone="Light"
            verticalPadding="Bigger"
          />
        </div>
      </div>
      <Table data={repeatedData} />
    </div>
  )
}
