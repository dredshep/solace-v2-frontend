/**
 * Renders the Solace V2 logo as an SVG.
 */
export default function SolaceV2Logo({
  size,
}: {
  /** The size of the logo in pixels. Defaults to 22 pixels if not provided.*/ size?: number
}) {
  return (
    <svg
      width={size?.toString() || '22'}
      // rest of the code
      height={size?.toString() || '22'}
      viewBox={`0 0 ${size?.toString() || '22'} ${size?.toString() || '22'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Spectrum Sign">
        <rect
          id="Rectangle 28"
          x="0.714287"
          y="5.34277"
          width="2.05714"
          height="11.3143"
          rx="1.02857"
          fill="#EE3A26"
        />
        <rect
          id="Rectangle 28_2"
          x="5.34287"
          y="2.77136"
          width="2.05714"
          height="16.4571"
          rx="1.02857"
          fill="#F9D146"
        />
        <rect
          id="Rectangle 28_3"
          x="9.97142"
          y="0.714233"
          width="2.05714"
          height="20.5714"
          rx="1.02857"
          fill="#58B743"
        />
        <rect
          id="Rectangle 28_4"
          x="14.6"
          y="2.77136"
          width="2.05714"
          height="16.4571"
          rx="1.02857"
          fill="#3683D1"
        />
        <rect
          id="Rectangle 28_5"
          x="19.2286"
          y="5.34277"
          width="2.05714"
          height="11.3143"
          rx="1.02857"
          fill="#9546EC"
        />
      </g>
    </svg>
  )
}
