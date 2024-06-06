interface SelectProps {
  name: string
  label: string
  options: { value: any; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

const Select: React.FC<SelectProps> = ({ name, label, options, value, onChange, className }) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`flex flex-col gap-2 justify-center h-12 bg-transparent rounded-md border-2 shadow-md text-amber-100 border-amber-100 my-2 ${className}`}
      >
        <span className={'bg-slate-500 absolute -translate-y-6 translate-x-2 px-2'}>{label}</span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={'bg-transparent h-full focus:outline-none mx-4'}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} className={''}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}

export default Select
