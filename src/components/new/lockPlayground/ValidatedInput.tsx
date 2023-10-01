import React from 'react'
import { useLockAmountInputValidation } from '@/hooks/lock/useLockAmountInputValidation' // Adjust the import based on your directory structure
import String0x from '@/constants/types/String0x'

interface ValidatedInputProps {
  poolAddress: String0x
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  poolAddress,
}) => {
  const { inputAmount, setInputAmount, isAmountValid, reason } =
    useLockAmountInputValidation(poolAddress)

  return (
    <div className="text-white">
      <input
        type="text"
        value={inputAmount}
        className="bg-backgroundMoreInteractive rounded-md text-sm h-10 px-4 w-64 my-4"
        onChange={(e) => setInputAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <p
        className={
          (reason ? 'text-accentWarning' : 'text-white') + ' text-sm mx-1'
        }
      >
        {reason || (isAmountValid ? 'Amount is valid' : 'Amount is not valid')}
      </p>
    </div>
  )
}
