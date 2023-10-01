import React from 'react'
import { useLockAmountInputValidation } from './hooks/useLockAmountInputValidation' // Adjust the import based on your directory structure
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
    <div>
      <input
        type="text"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <p>
        {reason || (isAmountValid ? 'Amount is valid' : 'Amount is not valid')}
      </p>
    </div>
  )
}
