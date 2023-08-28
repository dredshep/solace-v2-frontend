import RewardsBanner from '@/components/new/RewardsBanner'
import classNames from 'classnames'
import Image from 'next/image'

function LeftThingy() {
  return (
    <div className="text-white">
      <div className="text-4xl font-bold leading-10 mb-9">
        Claim lending rewards
      </div>
      <p className="text-medium font-medium leading-7 mb-10">
        Solace liquidity incentives are directed to pools <br /> by veSGT
        voters. Stake in these pools to earn <br />
        incentives. Boost with veSGT for up to 2.5x extra.
      </p>
    </div>
  )
}

type Token = {
  icon: string
  symbol: string
  name: string
}

type AssetRowProps = {
  tokens: Token[]
  assetName: string
  liquidityProvider: LiquidityProvider
}

type LiquidityProvider = {
  name: string
  icon: string
}

// prettier-ignore
function AssetRow({ tokens, assetName, liquidityProvider }: AssetRowProps) {
  return (
    <>
      <div className="relative w-12 h-9">
        {tokens.map((token, index) => (
          <div key={index} className={`bg-white rounded-full w-9 h-9 absolute left-${index * 3}`}>
            <Image src={token.icon} alt={`${token.name} icon`} className="w-6 h-6 mx-auto my-1" />
          </div>
        ))}
        <div className="bg-accent rounded-full w-4 h-4 absolute bottom-0 right-0"></div>
      </div>
      <div className="ml-2">{assetName}</div>
      <div className="flex items-center ml-2">
        <Image src={liquidityProvider.icon} alt={`${liquidityProvider.name} icon`} className="w-4 h-4 mr-1" />
        <span>{liquidityProvider.name}</span>
      </div>
    </>
  );
}

// prettier-ignore
const titles
 :{ title: string | JSX.Element, align?: 'left' | 'center' | 'right' }[] = [

  { title: 'Network'                                                 },
  { title: 'Asset'                                                   },
  { title: 'Next period votes',  align: 'right'                      },
  { title: 'My votes',           align: 'right'                      },
  { title: <div />,              align: 'right'                      },
];

//pretier-ignore
const claimsTitles: {
  title: string | JSX.Element
  align?: 'left' | 'center' | 'right'
}[] = [
  { title: 'Pools' },
  { title: 'Amount', align: 'right' },
  { title: 'Value', align: 'right' },
  { title: 'Claim', align: 'right' },
]

// prettier-ignore
const dummyDataRaw = [
  { pool:    {icon: "", name: "B-ETH-STABLE-Uni-v2 / veUSDC"},          amount: 12.34, value: 56.78 },
  { pool:    {icon: "", name: 'Wrapped Bitcoin Cash / Something Else'}, amount: 23.45, value: 67.89 },
];

const dummyData = dummyDataRaw.map((row) => ({
  ...row,
  assetName: (
    <div className="flex gap-2">
      <div className="text-white">
        {row.pool.icon ?? (
          <div className="ro`unded-full w-6 h-6 bg-white"></div>
        )}
      </div>
      <div>{row.pool.name}</div>
    </div>
  ),
  nextPeriodVotes: row.amount + '%',
  myVotes: row.value + '%',
}))

// have it take the same props of a div react html element
function FirstCellInRow(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="bg-backgroundInteractive p-4 flex items-center rounded-l"
    />
  )
}

function Table({ data }: { data: typeof dummyData }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr 1fr 1fr',
        gap: '8px 0',
      }}
      className="text-base font-semibold"
    >
      {claimsTitles.map((title, index) => (
        <div
          key={index}
          className={classNames(
            'text-textSecondary px-4 text-xs font-bold',
            title.align === 'right' ? 'text-end' : ''
          )}
        >
          {title.title}
        </div>
      ))}
      {data.map((row, index) => (
        <>
          <FirstCellInRow>
            {!row.pool.icon || !row.pool.icon.length ? (
              <div className="rounded-full w-6 h-6 bg-white"></div>
            ) : (
              <Image
                src={row.pool.icon}
                alt={`${row.pool.name} icon`}
                className="w-6 h-6 mx-auto my-1"
              />
            )}
            <div className="ml-2">{row.assetName}</div> {/* Asset name */}
          </FirstCellInRow>
          <div className="bg-backgroundInteractive p-4 flex items-center justify-end">
            {row.nextPeriodVotes}
          </div>
          <div className="bg-backgroundInteractive p-4 flex items-center justify-end">
            {row.myVotes}
          </div>
          <div className="bg-backgroundInteractive p-4 flex items-center justify-end rounded-r">
            <button className="border-2 border-secondary rounded bg-transparent text-secondary px-8 py-2">
              Claim
            </button>
          </div>
        </>
      ))}
    </div>
  )
}

const repeatedData = Array(5).fill(dummyData).flat()

export default function VeSGT() {
  return (
    <div className="flex flex-col gap-16 px-12 text-white">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <LeftThingy />
        <RewardsBanner />
      </div>
      <Table data={repeatedData} />
    </div>
  )
}
