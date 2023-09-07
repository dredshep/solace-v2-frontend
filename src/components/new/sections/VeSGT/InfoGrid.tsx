import DashBox from '../../generics/DashBox'
import { AddLiquidityModal } from '../../generics/Modal'

export default function InfoGrid() {
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
      <AddLiquidityModal>
        <DashBox
          title="My B-80SGT-20WETH"
          mainValue="$0.00"
          subValue="0"
          onClick={() => {}}
          grayTone="Light"
          verticalPadding="Bigger"
        />
      </AddLiquidityModal>
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
