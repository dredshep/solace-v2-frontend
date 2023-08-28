import Image from 'next/image'

function Asset({
  name,
  chain,
  logo,
}: {
  name: string
  chain: string
  logo: string
}) {
  return (
    <div>
      {/* <Image src={logo} alt={`${name} logo`} />
			<span>{name}</span>
			<span>{chain}</span> */}
      {/* using tailwind, put the logo on the left, and to the right, a unit of name on top and chain on bottom */}
      <div className="flex">
        <div className="h-9 relative">
          <Image src={logo} alt={`${name} logo`} className="h-full" />
          {/* let's add a little badge that goes on top of the logo at the bottom right corner. it's round and it's an image */}
          <Image
            src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389"
            alt="badge"
            className="absolute bottom-0 right-0 h-3 z-10"
          />
        </div>
        <div className="flex flex-col justify-center ml-2">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-xs font-medium">{chain}</span>
        </div>
      </div>
    </div>
  )
}

export default function Page2() {
  return (
    <div className="text-textPrimary mx-16 w-[calc(100%-128px)]">
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr>
            <th className="text-left text-xs font-bold text-textSecondary">
              Asset
            </th>
            <th className="text-left text-xs font-bold text-textSecondary">
              Premium APR*
            </th>
            <th className="text-left text-xs font-bold text-textSecondary">
              Yield
            </th>
            <th className="text-left text-xs font-bold text-textSecondary">
              Capacity
            </th>

            <th className="text-left text-xs font-bold text-textSecondary">
              Security/Risks
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#323942]">
            <td className="p-4">
              <Asset
                name="USDC"
                chain="Ethereum"
                logo="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389"
              />
            </td>
            <td className="font-semibold text-base">0.00%</td>
            <td className="font-semibold text-base">0.00%</td>
            <td className="font-semibold text-base">0.00%</td>
            <td className="font-semibold text-base">0.00%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
