interface SelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = ({ name, label, options, value, onChange }) => {
  return (
    <>
      <label htmlFor={name}>
        {label}
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
