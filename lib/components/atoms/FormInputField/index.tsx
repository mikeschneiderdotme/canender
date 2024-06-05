import { ChangeEvent } from 'react'

interface Props {
  id: string
  label: string
  inputType: 'number' | 'text'
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const FormField: React.FC<Props> = ({ id, label, inputType, value, handleChange, className }) => {
  return (
    <>
      <label htmlFor={id} className={`flex flex-col gap-2 justify-center bg-red-500 ${className}`}>
        <h2>{label}</h2>
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
