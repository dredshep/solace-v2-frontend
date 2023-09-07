import { TokenInfo } from '@/constants/types'
import * as Select from '@radix-ui/react-select'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const StyledDropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  background-color: #1a202c;
  border-right: 1px solid #4fd1c5;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4a5568;
  }

  svg {
    fill: #63b3ed;
  }
`

// const StyledDropdownTrigger = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
// `;

const StyledDropdownContent = styled(Select.Content)`
  border: 1px solid #4fd1c5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #1a202c;
  max-height: 150px;
  overflow-y: auto;
`

const StyledDropdownItem = styled(Select.Item)`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4a5568;
  }

  span {
    color: #63b3ed;
  }
`

export default function CustomInputWithSelect() {
  const [inputValue, setInputValue] = useState('')

  const testTokens: TokenInfo[] = [
    {
      symbol: 'SGT',
      name: 'Solace Governance Token',
      address: '0x000000000',
      decimals: 18,
      balance: BigInt(0), // add balance property
      price: 0, // add price property
    },
    {
      symbol: 'WETH',
      name: 'Wrapped Ether',
      address: '0x000000000',
      decimals: 18,
      balance: BigInt(0), // add balance property
      price: 0, // add price property
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x000000000',
      decimals: 6,
      balance: BigInt(0), // add balance property
      price: 0, // add price property
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      address: '0x000000000',
      decimals: 6,
      balance: BigInt(0), // add balance property
      price: 0, // add price property
    },
  ]
  const [selectedD1, setSelectedD1] = useState<TokenInfo>(testTokens[0])

  const handleSelectedCoin = (value: string) => {
    const selectedToken = testTokens.find(
      (token) => token.symbol.toLowerCase() === value.toLowerCase()
    )
    if (!selectedToken) return
    setSelectedD1(selectedToken)
  }

  return (
    <div className="relative w-full border border-secondary rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center h-12">
        <Select.Root onValueChange={handleSelectedCoin}>
          <StyledDropdownTrigger as={Select.Trigger}>
            <svg className="w-6 h-6" fill="#3b82f6">
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
            <span>{selectedD1?.symbol ?? 'Choose currency'}</span>
            {/* caret down */}
            <svg
              // rotate 180 when dropdown is open
              className="w-4 h-4"
              fill="#63b3ed"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </StyledDropdownTrigger>
          <StyledDropdownContent>
            {testTokens.map((token) => (
              <StyledDropdownItem key={token.symbol} value={token.symbol}>
                {token.symbol}
              </StyledDropdownItem>
            ))}
          </StyledDropdownContent>
        </Select.Root>
        <input
          className="flex-grow p-4 border-none min-w-0 outline-none text-base bg-backgroundMoreInteractive transition-bg duration-200 h-full focus:bg-accentTextDarkPrimary"
          type="text"
          placeholder="$"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button className="px-4 py-3 bg-accentAction text-white border-none font-bold cursor-pointer transition-bg duration-200 hover:bg-accentFailure">
          Max
        </button>
      </div>
    </div>
  )
}
