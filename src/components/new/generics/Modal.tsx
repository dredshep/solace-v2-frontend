import {
  BalanceDropdownOptions,
  GenericInputSection,
} from '@/components/molecules/Dropdown'
import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import * as Select from '@radix-ui/react-select'
import CustomInputWithSelect from '@/components/molecules/CustomInputWithSelect'
import { TokenInfo } from '@/constants/types'
import * as Popover from '@radix-ui/react-popover'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Switch from '@radix-ui/react-switch'

export const Modal = ({
  settings,
  trigger,
  content,
  title,
  submitText,
  onSubmit,
  ...props
}: {
  settings?: React.ReactNode
  trigger: React.ReactNode
  content: React.ReactNode
  title: string
  submitText: string
  onSubmit: () => void
}) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-backgroundInteractive opacity-40 " />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-backgroundInteractive rounded-lg p-4 text-white max-w-sm">
          <div className="flex justify-between items-center mb-6">
            {settings}
            <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            {/* top right x icon */}
            <Dialog.Close>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mb-4">{content}</Dialog.Description>

          <Dialog.Trigger asChild>
            <button
              className="bg-accentAction text-white text-base w-full font-bold px-8 py-3 rounded"
              onClick={onSubmit}
            >
              {submitText}
            </button>
          </Dialog.Trigger>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default function TestTheThing() {
  return (
    <Modal
      title="Test"
      content="Test"
      submitText="Submit"
      onSubmit={() => console.log('Submitted')}
      trigger={<button>Trigger</button>}
    />
  )
}

function CurrencySelectInput() {
  const [d1, setD1] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedD1, setSelectedD1] = useState<any>(null)
  const testTokens = [
    {
      symbol: 'SGT',
      name: 'Solace Governance Token',
      address: '0x000000000',
      decimals: 18, // Added this line
    },
    {
      symbol: 'WETH',
      name: 'Wrapped Ether',
      address: '0x000000000',
      decimals: 18, // Added this line
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x000000000',
      decimals: 6, // Adjust as necessary
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      address: '0x000000000',
      decimals: 6, // Adjust as necessary
    },
  ]

  const handleSelectedCoin = (value: string) => {
    const selectedToken = testTokens.find(
      (token) => token.address.toLowerCase() === value.toLowerCase()
    )
    setSelectedD1(selectedToken)
  }

  return (
    <>
      <GenericInputSection
        hasArrow
        isOpen={d1}
        placeholder={'$'}
        frontIcon={<>Icon</>}
        frontButtonText={selectedD1?.symbol ?? 'Test'}
        backButtonText={'Max Value'}
        value={inputValue}
        onChange={(e: any) => setInputValue(e.target.value)}
        onClickFront={() => setD1(!d1)}
        onClickBack={() => setInputValue('max')}
      />
      <BalanceDropdownOptions
        isOpen={d1}
        ignorePrice
        searchedList={testTokens.map((token) => {
          return { ...token, balance: BigInt(0), price: 0 }
        })}
        onClick={(value: string) => {
          handleSelectedCoin(value)
          setD1(false)
        }}
      />
    </>
  )
}

function CurrencySelectInput2() {
  const [inputValue, setInputValue] = useState('')
  const [selectedD1, setSelectedD1] = useState<any>(null)

  const [d1, setD1] = useState(false)
  const testTokens = [
    {
      symbol: 'SGT',
      name: 'Solace Governance Token',
      address: '0x000000000',
      decimals: 18, // Added this line
    },
    {
      symbol: 'WETH',
      name: 'Wrapped Ether',
      address: '0x000000000',
      decimals: 18, // Added this line
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x000000000',
      decimals: 6, // Adjust as necessary
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      address: '0x000000000',
      decimals: 6, // Adjust as necessary
    },
  ]

  const handleSelectedCoin = (value: string) => {
    const selectedToken = testTokens.find(
      (token) => token.address.toLowerCase() === value.toLowerCase()
    )
    setSelectedD1(selectedToken)
  }

  return (
    <div className="relative">
      a
      <GenericInputSection
        hasArrow
        placeholder={'$'}
        frontIcon={
          <svg className="w-6 h-6 fill-accentAction">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        }
        frontButtonText={selectedD1?.symbol ?? 'Test'}
        backButtonText={'Max Value'}
        value={inputValue}
        onChange={(e: any) => setInputValue(e.target.value)}
      />
      <Select.Root onValueChange={handleSelectedCoin}>
        <Select.Trigger className="cursor-pointer">
          {selectedD1?.symbol ?? 'Choose currency'}
        </Select.Trigger>
        <Select.Content className="absolute top-full mt-2 w-full z-10 border border-gray-200 bg-white rounded-md shadow-lg">
          {testTokens.map((token) => (
            <Select.Item key={token.address} value={token.address}>
              {token.symbol}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  )
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  )
}

// ToggleGroupItem Component
function ToggleGroupItem({
  name,
  value,
  children,
}: {
  name: string
  value: string
  children: React.ReactNode
}) {
  return (
    <ToggleGroup.Item
      className="data-[state=on]:bg-backgroundMoreInteractive data-[state=on]:border-white rounded px-2 border-textTertiary border bg-backgroundInteractive w-max"
      name={name}
      value={value}
    >
      {children}
    </ToggleGroup.Item>
  )
}

// Label Component
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold mb-3">{children}</div>
}

// SlippageCustomInput Component
function SlippageCustomInput() {
  return (
    <ToggleGroup.Item
      className="data-[state=on]:bg-backgroundMoreInteractive data-[state=on]:border-white rounded px-2 border-textTertiary border bg-backgroundInteractive w-max flex gap-2"
      name="slippage"
      value="custom"
    >
      <input
        type="text"
        className="bg-backgroundInteractive rounded w-14 text-right px-2 h-full outline-none focus:bg-backgroundMoreInteractive"
        placeholder="0.5"
      />
      <div>%</div>
    </ToggleGroup.Item>
  )
}

// SettingsPopover Component (using the above components)
function SettingsPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <SettingsIcon />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="absolute top-full mt-2 w-full z-10">
          <div className="p-4 bg-backgroundSurface rounded text-white w-max shadow-md shadow-background">
            <Label>Slippage Tolerance</Label>
            <ToggleGroup.Root
              className="flex justify-between gap-6"
              type="single"
            >
              <div className="flex gap-4 h-8">
                <ToggleGroupItem name="slippage" value="0.5">
                  0.5%
                </ToggleGroupItem>
                <ToggleGroupItem name="slippage" value="1">
                  1%
                </ToggleGroupItem>
                <ToggleGroupItem name="slippage" value="2">
                  2%
                </ToggleGroupItem>
              </div>
              <SlippageCustomInput />
            </ToggleGroup.Root>

            <Label>Transaction type</Label>
            <ToggleGroup.Root className="flex gap-2 h-8" type="single">
              <ToggleGroupItem name="transaction" value="legacy">
                Legacy
              </ToggleGroupItem>
              <ToggleGroupItem name="transaction" value="EIP1559">
                EIP1559
              </ToggleGroupItem>
            </ToggleGroup.Root>

            <Label>Use signatures</Label>
            <Switch.Root className="relative inline-block w-12 h-6 rounded-full border bg-backgroundInactive border-textTertiary transition-colors duration-200 focus:outline-none focus:shadow-outline">
              <Switch.Thumb className="absolute top-px left-px w-5 h-5 bg-accentAction rounded-full transform transition-transform duration-200 data-[state=checked]:translate-x-6" />
            </Switch.Root>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export function AddLiquidityModal({ children }: { children: React.ReactNode }) {
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null)
  const [amount, setAmount] = useState<string>('')
  return (
    <Modal
      title="Add Liquidity"
      settings={<SettingsPopover />}
      content={
        <div className="flex flex-col gap-4">
          {/* <CurrencySelectInput />
          <CurrencySelectInput2 /> */}
          <CustomInputWithSelect />
          <div className="text-sm text-textSecondary">
            Balance: 0.0127 (~$0.05)
          </div>

          <table className="w-full">
            <tbody>
              <tr className="">
                <td className="font-medium bg-backgroundMoreInteractive rounded-l text-sm py-3  text-white px-2 border-r-2 border-backgroundInteractive">
                  Total
                </td>
                <td className="font-medium bg-backgroundMoreInteractive rounded-r text-sm py-3  text-accent px-2">
                  $23.69
                </td>
              </tr>
              <tr>
                <td className="font-medium text-sm py-3  text-white px-2">
                  Price impact
                </td>
                <td className="font-medium text-sm py-3  text-white px-2">
                  0.5%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      submitText="Add Liquidity"
      onSubmit={() => alert('Submitted')}
      trigger={children}
    />
  )
}
