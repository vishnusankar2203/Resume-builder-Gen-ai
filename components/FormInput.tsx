import React from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  label: string
  name: string
  type?: string
  register: UseFormRegister<any>
  required?: boolean
  placeholder?: string
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  required = false,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormInput
