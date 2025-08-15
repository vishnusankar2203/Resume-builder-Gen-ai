import React from 'react'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    linkedin?: string
    github?: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  skills: string[]
  certifications?: Array<{
    name: string
    issuer: string
    year: string
  }>
  achievements?: Array<{
    title: string
    year: string
    type: string
  }>
}

interface ResumePreviewProps {
  data: ResumeData
  template: string
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const renderModernTemplate = () => (
    <div className="p-8 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.name}
        </h1>
        <div className="text-gray-600 space-y-1">
          <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
          {data.personalInfo.linkedin && <p>LinkedIn: {data.personalInfo.linkedin}</p>}
          {data.personalInfo.github && <p>GitHub: {data.personalInfo.github}</p>}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 border-b-2 border-primary-500 pb-1">
          Professional Summary
        </h2>
        <p className="text-gray-700">{data.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-500 pb-1">
          Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-gray-900">{exp.title}</h3>
            <p className="text-gray-600">{exp.company} • {exp.duration}</p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-500 pb-1">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
            <p className="text-gray-600">{edu.institution} • {edu.year}</p>
          </div>
        ))}
      </div>

      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-500 pb-1">
            CERTIFICATIONS
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <span className="font-semibold">{cert.name}</span> - {cert.issuer} ({cert.year})
              </div>
            ))}
          </div>
        </div>
      )}

      {data.achievements && data.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-500 pb-1">
            ACHIEVEMENTS
          </h2>
          <div className="space-y-2">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="text-sm">
                • {achievement.title} ({achievement.year})
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-500 pb-1">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  const renderClassicTemplate = () => (
    <div className="p-8 bg-white">
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-4xl font-serif text-gray-900 mb-2">
          {data.personalInfo.name}
        </h1>
        <div className="text-gray-600">
          <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
          {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
          {data.personalInfo.github && <p>{data.personalInfo.github}</p>}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 uppercase tracking-wide">
          Professional Summary
        </h2>
        <p className="text-gray-700 text-justify">{data.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Professional Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-gray-900">{exp.title}</h3>
            <p className="text-gray-600 italic">{exp.company} | {exp.duration}</p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
            <p className="text-gray-600 italic">{edu.institution} | {edu.year}</p>
          </div>
        ))}
      </div>

      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-1">
              <p className="text-gray-900">{cert.name} - {cert.issuer} ({cert.year})</p>
            </div>
          ))}
        </div>
      )}

      {data.achievements && data.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Achievements
          </h2>
          {data.achievements.map((achievement, index) => (
            <div key={index} className="mb-1">
              <p className="text-gray-900">• {achievement.title} ({achievement.year})</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Skills
        </h2>
        <p className="text-gray-700">{data.skills.join(', ')}</p>
      </div>
    </div>
  )

  const renderMinimalTemplate = () => (
    <div className="p-8 bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-900 mb-1">
          {data.personalInfo.name}
        </h1>
        <div className="text-sm text-gray-600 space-y-0.5">
          <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
          {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
          {data.personalInfo.github && <p>{data.personalInfo.github}</p>}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-widest">
          About
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-widest">
          Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <h3 className="text-sm font-medium text-gray-900">{exp.title}</h3>
            <p className="text-xs text-gray-600">{exp.company} • {exp.duration}</p>
            <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-widest">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-sm font-medium text-gray-900">{edu.degree}</h3>
            <p className="text-xs text-gray-600">{edu.institution} • {edu.year}</p>
          </div>
        ))}
      </div>

      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-widest">
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-1">
              <p className="text-sm text-gray-700">{cert.name} - {cert.issuer} ({cert.year})</p>
            </div>
          ))}
        </div>
      )}

      {data.achievements && data.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-widest">
            Achievements
          </h2>
          {data.achievements.map((achievement, index) => (
            <div key={index} className="mb-1">
              <p className="text-sm text-gray-700">• {achievement.title} ({achievement.year})</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-widest">
          Skills
        </h2>
        <p className="text-sm text-gray-700">{data.skills.join(' • ')}</p>
      </div>
    </div>
  )

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return renderClassicTemplate()
      case 'minimal':
        return renderMinimalTemplate()
      case 'modern':
      default:
        return renderModernTemplate()
    }
  }

  return (
    <div className="w-full h-full">
      {renderTemplate()}
    </div>
  )
}

export default ResumePreview
