import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ResumePreview from '@/components/ResumePreview'
import TemplateSelector from '@/components/TemplateSelector'
import FormInput from '@/components/FormInput'
import CertificationsForm from '@/components/CertificationsForm'
import AchievementsForm from '@/components/AchievementsForm'
import { Download, Sparkles } from 'lucide-react'

interface FormData {
  fullName: string
  email: string
  phone: string
  linkedin: string
  github: string
  summary: string
  experience: string
  education: string
  skills: string
  template: string
}

export default function Home() {
  const [resumeData, setResumeData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm<FormData>()
  
  const [certifications, setCertifications] = useState<Array<{
    id: string;
    name: string;
    issuer: string;
    year: string;
  }>>([])
  
  const [achievements, setAchievements] = useState<Array<{
    id: string;
    title: string;
    year: string;
    type: 'award' | 'hackathon' | 'publication' | 'speaking';
  }>>([])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          certifications,
          achievements
        }),
      })
      const result = await response.json()
      setResumeData(result.resume)
    } catch (error) {
      console.error('Error generating resume:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadResume = () => {
    const element = document.getElementById('resume-preview')
    if (element) {
      // Get the resume content
      const resumeContent = element.innerHTML
      
      // Create a complete HTML document
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData?.personalInfo?.name || 'Resume'}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        .resume-container {
            padding: 40px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        h1 { color: #2c3e50; margin-bottom: 10px; }
        h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 5px; margin-top: 30px; }
        .contact-info { margin-bottom: 20px; color: #666; }
        .experience-item, .education-item { margin-bottom: 20px; }
        .job-title { font-weight: bold; color: #2c3e50; }
        .company { color: #7f8c8d; font-style: italic; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
        .skill-tag { background: #3498db; color: white; padding: 5px 12px; border-radius: 15px; font-size: 14px; }
        .cert-item, .ach-item { margin-bottom: 8px; }
        @media print {
            body { margin: 0; padding: 0; }
            .resume-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        ${resumeContent}
    </div>
</body>
</html>
      `
      
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${resumeData?.personalInfo?.name?.replace(/\s+/g, '_') || 'resume'}_${new Date().toISOString().split('T')[0]}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Resume Builder
          </h1>
          <p className="text-lg text-gray-600">
            Generate a professional resume with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Full Name"
                name="fullName"
                register={register}
                required
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                register={register}
                required
              />
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                register={register}
                required
              />
              <FormInput
                label="LinkedIn URL"
                name="linkedin"
                register={register}
              />
              <FormInput
                label="GitHub URL"
                name="github"
                register={register}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Summary
                </label>
                <textarea
                  {...register('summary')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Brief summary of your professional background..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Experience
                </label>
                <textarea
                  {...register('experience')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="List your work experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <textarea
                  {...register('education')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your educational background..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <textarea
                  {...register('skills')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="List your skills, separated by commas..."
                />
              </div>

              <TemplateSelector register={register} />

              <div>
                <CertificationsForm 
                  certifications={certifications} 
                  onChange={setCertifications} 
                />
              </div>

              <div>
                <AchievementsForm 
                  achievements={achievements} 
                  onChange={setAchievements} 
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Resume
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Preview</h2>
              {resumeData && (
                <button
                  onClick={downloadResume}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              {resumeData ? (
                <ResumePreview data={resumeData} template={watch('template')} />
              ) : (
                <div className="h-96 flex items-center justify-center text-gray-500">
                  Fill out the form and click "Generate Resume" to see preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
