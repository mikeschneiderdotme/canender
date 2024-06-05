import { ChangeEvent } from 'react'

interface Props {
  id: string
  inputLabel: string
  inputType: 'number' | 'text'
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormField: React.FC<Props> = ({ id, inputLabel, inputType, value, handleChange }) => {
  return (
    <>
      <label htmlFor={id}>
        {inputLabel}
        <input
          id={id}
          type={inputType}
          onChange={handleChange}
          value={value === '0' ? '' : value}
        />
      </label>
    </>
  )
}

export default FormField
