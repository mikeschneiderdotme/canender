import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface Props {
  type: 'submit' | 'reset'
  className?: string
}

const FormButton: React.FC<PropsWithChildren<Props>> = ({ children, type, className }) => {
  return (
    <button
      type={type}
      className={`h-12 w-fit px-8 mx-auto text-xl bg-amber-100 hover:bg-lime-200 rounded-md border-2 border-slate-700 shadow-md ${className}`}
    >
      {children}
    </button>
  )
}
export default FormButton
