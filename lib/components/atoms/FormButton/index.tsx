import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface Props {
  type: 'submit' | 'reset'
  className?: string
}

const FormButton: React.FC<PropsWithChildren<Props>> = ({ children, type, className }) => {
  return (
    <button type={type} className={`bg-green-500 ${className}`}>
      {children}
    </button>
  )
}
export default FormButton
