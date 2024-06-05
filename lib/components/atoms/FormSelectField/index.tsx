interface SelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

const Select: React.FC<SelectProps> = ({ name, label, options, value, onChange, className }) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`flex flex-col gap-2 justify-center bg-red-500 ${className}`}
      >
        <h2>{label}</h2>
        <select name={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}

export default Select
