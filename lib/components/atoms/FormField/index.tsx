'use client'
import { HTMLInputTypeAttribute } from "react"

interface Props {
    id: string
    inputLabel: string
    inputType: HTMLInputTypeAttribute
}
const FormField: React.FC<Props> =({ id, inputLabel, inputType }) => {
    return ( 
        <>
            <label htmlFor={id}>
                {inputLabel}
                {inputType === "number" && <input id={id} type={inputType} />}
            </label>
        </>
    )
}

export default FormField