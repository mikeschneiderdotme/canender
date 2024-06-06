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
      <label
        htmlFor={id}
        className={`flex flex-col gap-2 justify-center h-12 bg-transparent rounded-md border-2 shadow-md text-amber-100 border-amber-100 my-2 ${className}`}
      >
        <span className={'bg-slate-500 absolute -translate-y-6 translate-x-2 px-2'}>{label}</span>
        <input
          id={id}
          type={'text'}
          inputMode={inputType === 'number' ? 'numeric' : 'text'}
          pattern={inputType === 'number' ? '^[0-9]+$' : '.*'}
          onChange={handleChange}
          value={value === '0' ? '' : value}
          className={'bg-transparent h-full px-4 focus:outline-lime-400'}
        />
      </label>
    </>
  )
}

export default FormField
