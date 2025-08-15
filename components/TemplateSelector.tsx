import React from 'react'
import { UseFormRegister } from 'react-hook-form'

interface TemplateSelectorProps {
  register: UseFormRegister<any>
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ register }) => {
  const templates = [
    { value: 'modern', label: 'Modern', description: 'Clean and contemporary design' },
    { value: 'classic', label: 'Classic', description: 'Traditional professional format' },
    { value: 'minimal', label: 'Minimal', description: 'Simple and elegant layout' },
  ]

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose Template
      </label>
      <div className="space-y-2">
        {templates.map((template) => (
          <label key={template.value} className="flex items-center">
            <input
              type="radio"
              value={template.value}
              {...register('template')}
              className="mr-2 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">{template.label}</span>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector
