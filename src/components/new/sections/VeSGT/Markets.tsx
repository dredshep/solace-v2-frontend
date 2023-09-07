import DashBox from '../../generics/DashBox'

export default function Markets() {
  return (
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
  )
}
