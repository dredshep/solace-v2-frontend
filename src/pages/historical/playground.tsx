import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion } from '@/components/atoms/Accordion'
import { HorizontalSeparator } from '@/components/atoms/Break'
import { Button } from '@/components/atoms/Button'
import { Card, CardContainer } from '@/components/atoms/Card'
import { Flex } from '@/components/atoms/Flex'
import { Scrollable } from '@/components/atoms/Scroll'
import {
  Table,
  TableBody,
  TableData,
  TableFoot,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/Table'
import { Tdiv } from '@/components/atoms/Text'
import { CheckboxOption } from '@/components/molecules/CheckboxOption'
import { SmallerInputSection } from '@/components/atoms/Input'
import { StyledTooltip } from '@/components/molecules/Tooltip'
import { CalendarModal } from '@/components/organisms/Calendar.tsx/CalendarModal'
import {
  BalanceDropdownOptions,
  GenericInputSection,
} from '@/components/molecules/Dropdown'
import {
  ALCHEMY_ETHEREUM_API_KEY,
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_POLYGON_API_KEY,
  Z_TABLE,
} from '../constants'
import { TransactionCondition } from '../constants/enums'
import { ReadToken } from '../constants/types'
import { variants } from '../styles/animation-styles'
import { fixed, formatAmount } from '../utils'
import { useAppSelector } from '@/store/_hooks'
import { useAccount, useNetwork } from 'wagmi'
import { useToast } from '@/hooks/useToast'
import { useRead, useWrite } from '@/hooks/contract'
import { erc20ABI } from '@wagmi/core'

const testTokens: ReadToken[] = [
  {
    address: '0x0000000000000000000000000000000000000000',
    name: 'Test Token 1',
    symbol: 'TT1',
    decimals: 18,
  },
  {
    address: '0x0000000000000000000000000000000000000001',
    name: 'Test Token 2',
    symbol: 'TT2',
    decimals: 10,
  },
  {
    address: '0x0000000000000000000000000000000000000002',
    name: 'Test Stable',
    symbol: 'TS',
    decimals: 6,
    stablecoin: true,
  },
]

export default function Home(): JSX.Element {
  const appTheme = useAppSelector((state) => state.general.appTheme)
  const defaultLocalChain = useAppSelector(
    (state) => state.general.defaultLocalChain
  )

  const [openAccordion, setOpenAccordion] = useState(false)
  const [d1, setD1] = useState(false)
  const [selectedD1, setSelectedD1] = useState<ReadToken | undefined>(undefined)
  const [d1Input, setD1Input] = useState<string>('')
  const [inputValue, setInputValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [openDates, setOpenDates] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())

  const selectedProvider = useAppSelector(
    (state) => state.general.selectedProvider
  )
  const minute = useAppSelector((state) => state.general.minute)
  // const block = useAppSelector((state) => state.provider.latestBlock) // INFO - get latest block number in real time, but disabled atm because it causes unnecessary rerenders by constantly refreshing data
  const { chain } = useNetwork()
  const { address: account } = useAccount()
  const [localAccount, setLocalAccount] = useState<string | undefined>()

  const { makeTxToast } = useToast()

  const {
    data: readData,
    isLoading: isReadLoading,
    refetch: refetchRead,
  } = useRead<bigint>(
    {
      address: '0x6a49238e4d0fA003BA07fbd5ec8B6b045f980574',
      abi: erc20ABI,
      chainId: chain?.id ?? defaultLocalChain.chainId,
    },
    'name',
    [],
    (data) => {
      console.log('read data', data)
    },
    (data) => {
      console.log('read error', data)
    }
  )

  const {
    writeAsync,
    writeData,
    writeError,
    txData,
    txError,
    isTxLoading,
    isTxSuccess,
  } = useWrite(
    {
      address: '0x6a49238e4d0fA003BA07fbd5ec8B6b045f980574',
      abi: erc20ABI,
      chainId: chain?.id ?? defaultLocalChain.chainId,
    },
    'approve',
    ['0x501acE7a18b0F59E51eb198cD73480F8467DE100', inputValue],
    (data) => {
      console.log('write success', data)
      makeTxToast(
        't',
        TransactionCondition.PENDING,
        appTheme,
        data.hash,
        data.hash
      )
    },
    (error) => {
      console.log('write error', error)
    },
    (data) => {
      console.log('tx success', data)
      makeTxToast(
        't',
        TransactionCondition.SUCCESS,
        appTheme,
        data.transactionHash,
        data.transactionHash
      )
    },
    (error) => {
      console.log('tx error', error)
      makeTxToast(
        't',
        TransactionCondition.FAILURE,
        appTheme,
        error.transactionHash,
        error.transactionHash,
        error
      )
    }
  )

  useEffect(() => {
    setLocalAccount(account)
  }, [account])

  const successToast = async () => {
    const now = Date.now()
    makeTxToast(
      't',
      TransactionCondition.PENDING,
      appTheme,
      `${now}`,
      '0x0000000000000000000000000000000000000000',
      undefined
    )
    await new Promise((resolve) => setTimeout(() => resolve(`${now}`), 3000))
    makeTxToast(
      't',
      TransactionCondition.SUCCESS,
      appTheme,
      `${now}`,
      '0x0000000000000000000000000000000000000000',
      undefined
    )
  }

  const cancelledToast = async () => {
    const now = Date.now()
    makeTxToast('t', TransactionCondition.PENDING, appTheme, `${now}`)
    await new Promise((resolve) => setTimeout(() => resolve(`${now}`), 3000))
    makeTxToast('t', TransactionCondition.CANCELLED, appTheme, `${now}`)
  }

  const failToast = async () => {
    const now = Date.now()
    makeTxToast(
      't',
      TransactionCondition.PENDING,
      appTheme,
      `${now}`,
      '0x0000000000000000000000000000000000000000'
    )
    await new Promise((resolve) => setTimeout(() => resolve(`${now}`), 3000))
    makeTxToast(
      't',
      TransactionCondition.FAILURE,
      appTheme,
      `${now}`,
      '0x0000000000000000000000000000000000000000',
      'failed'
    )
  }

  const handleSelectedCoin = useCallback(
    (addr: string) => {
      const coin = testTokens.find((c) => c.address === addr)
      if (coin) {
        if (selectedD1 && coin.decimals < selectedD1.decimals) {
          setD1Input(fixed(formatAmount(d1Input), coin.decimals).toString())
        }
        setSelectedD1(coin)
      }
    },
    [d1Input, selectedD1]
  )

  return (
    <motion.div
      variants={variants.drop}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <Card>
        <Tdiv primary>
          I am a card component, but in this case, I also function as a banner!
        </Tdiv>
      </Card>
      <Tdiv primary>{selectedProvider?.toString()}</Tdiv>
      <Tdiv primary>minutes passed: {minute}</Tdiv>
      {/* <Tdiv primary>blocknumber: {block.number.toString()}</Tdiv> */}
      <Tdiv primary>local chainId: {defaultLocalChain.chainId}</Tdiv>
      <Tdiv primary>local explorer: {defaultLocalChain.explorer.url}</Tdiv>
      <Tdiv primary>web3 chainId: {chain?.id}</Tdiv>
      <Tdiv primary>web3 explorer: {chain?.blockExplorers?.default.url}</Tdiv>
      <Tdiv primary>web3 account: {localAccount}</Tdiv>
      <Tdiv primary>
        example useRead value:{' '}
        {isReadLoading ? 'loading' : readData?.toString() ?? 'none'}
      </Tdiv>
      <Button inquiry onClick={refetchRead}>
        click me to call useRead function again
      </Button>
      <Button onClick={writeAsync}>click me to call contract function</Button>
      <Flex col itemsCenter gap={10}>
        <CardContainer>
          <Card>
            <Tdiv primary>I am nested card 1</Tdiv>
          </Card>
          <Card>
            <Tdiv primary>I am nested card 2</Tdiv>
          </Card>
          <Card>
            <Tdiv primary>I am nested card 3</Tdiv>
          </Card>
        </CardContainer>
        <Card interactiveBg>
          <Tdiv primary>
            I am a card with a different background color to let the user know
            they can interact with me!
          </Tdiv>
        </Card>
        <Flex gap={10}>
          <Button big success onClick={successToast}>
            create successful toast
          </Button>
          <Button big warning onClick={cancelledToast}>
            create cancelled toast
          </Button>
          <Button big error onClick={failToast}>
            create failed toast
          </Button>
        </Flex>
        <HorizontalSeparator widthP={100} />
        <Flex gap={10} widthP={100}>
          <Flex col gap={4} p={5}>
            <Tdiv primary>primary</Tdiv>
            <Tdiv secondary>secondary</Tdiv>
            <Tdiv tertiary>tertiary</Tdiv>
            <Tdiv lightPrimary>lightPrimary</Tdiv>
            <Tdiv lightSecondary>lightSecondary</Tdiv>
            <Tdiv lightTertiary>lightTertiary</Tdiv>
            <Tdiv darkPrimary>darkPrimary</Tdiv>
            <Tdiv darkSecondary>darkSecondary</Tdiv>
            <Tdiv darkTertiary>darkTertiary</Tdiv>
            <Tdiv info>info</Tdiv>
            <Tdiv success>success</Tdiv>
            <Tdiv warning>warning</Tdiv>
            <Tdiv error>error</Tdiv>
            <Tdiv inquiry>inquiry</Tdiv>
          </Flex>
          <Scrollable p={0} maxDesktopHeight={'30vh'}>
            <Table textAlign="center" style={{ borderSpacing: '0px 7px' }}>
              <TableHead sticky zIndex={Z_TABLE + 1}>
                <TableRow>
                  <TableHeader>A</TableHeader>
                  <TableHeader>B</TableHeader>
                  <TableHeader>C</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
              </TableBody>
              <TableFoot sticky zIndex={Z_TABLE + 1}>
                <TableRow>
                  <TableHeader>E</TableHeader>
                  <TableHeader>F</TableHeader>
                  <TableHeader>G</TableHeader>
                </TableRow>
              </TableFoot>
            </Table>
          </Scrollable>
          <Flex col>
            <Button
              big
              inquiry
              onClick={() => setOpenAccordion(!openAccordion)}
            >
              {`${process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_API_KEY},
              ${ALCHEMY_ETHEREUM_API_KEY},
                  ${ALCHEMY_GOERLI_API_KEY},
                  ${ALCHEMY_POLYGON_API_KEY}`}
              Test Accordion
            </Button>
            <Accordion isOpen={openAccordion} customHeight={'30vh'}>
              <Flex col p={10} gap={10}>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
                <Card interactiveBg>
                  <Tdiv>I am inside the accordion</Tdiv>
                </Card>
              </Flex>
            </Accordion>
          </Flex>
          <Flex col gap={4}>
            <GenericInputSection
              nohover
              isOpen={d1}
              placeholder={'$'}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            />
            <GenericInputSection
              nohover
              isOpen={d1}
              placeholder={'$'}
              frontIcon={<>Icon</>}
              frontButtonText={'Fixed'}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            />
            <GenericInputSection
              displayIconOnMobile={false}
              nohover
              isOpen={d1}
              placeholder={'$'}
              frontIcon={<>Icon</>}
              frontButtonText={'Fixed'}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            />
            <GenericInputSection
              hasArrow
              isOpen={d1}
              placeholder={'$'}
              frontIcon={<>Icon</>}
              frontButtonText={selectedD1?.symbol ?? 'Test'}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
              onClickFront={() => setD1(!d1)}
            />
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
            <GenericInputSection
              hasArrow
              isOpen={d1}
              placeholder={'$'}
              backButtonText={'Max Value'}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
              onClickBack={() => setInputValue('max')}
            />
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
              backButtonDisabled
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
          </Flex>
          <Flex col gap={4}>
            <SmallerInputSection
              placeholder="Search"
              value={d1Input}
              onChange={(e: any) => setD1Input(e.target.value)}
            />
            <CheckboxOption
              isChecked={checked}
              setChecked={setChecked}
              text={'Check me'}
            />
            <StyledTooltip id={'tt'} tip={'I am a tooltip'} alwaysShowChildren>
              <Button>Hover over me</Button>
            </StyledTooltip>
            <StyledTooltip
              id={'tt1'}
              tip={
                'I am a tooltip with a very long sentence that should ideally be broken into multiple lines so it is easier for the user.'
              }
              alwaysShowChildren
            >
              <Button>Hover over me</Button>
            </StyledTooltip>
            <StyledTooltip
              id={'tt2'}
              tip={'I am a tooltip with a link'}
              alwaysShowChildren
              link={'https://google.com'}
            >
              <Button>Hover over me, I have link</Button>
            </StyledTooltip>
            <Button onClick={() => setOpenDates(!openDates)}>
              Open Calendar
            </Button>
            {/* <CalendarModal
              modalTitle={'Select Date'}
              handleClose={() => setOpenDates(false)}
              isOpen={openDates}
              selectedDate={date}
              setSelectedDate={setDate}
            /> */}
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  )
}
