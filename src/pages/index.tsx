import CallToActionSection from '@/components/new/sections/VeSGT/CallToActionSection'
import ChartsBanner from '@/components/new/sections/VeSGT/ChartsBanner'
import InfoGrid from '@/components/new/sections/VeSGT/InfoGrid'
import Table from '@/components/new/sections/VeSGT/Table'
import Markets from '@/components/new/sections/VeSGT/Markets'
import TestTheThing from '@/components/new/generics/Modal'

export default function VeSGT() {
  return (
    <div className="flex flex-col gap-16 px-4 lg:px-12 text-white">
      <div className="flex flex-col xl:flex-row gap-16 items-center">
        <CallToActionSection />
        <ChartsBanner />
        <TestTheThing />
      </div>
      <InfoGrid />
      <Markets />
      <Table />
    </div>
  )
}
