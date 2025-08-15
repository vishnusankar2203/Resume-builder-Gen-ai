import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ResumeData {
  fullName: string
  email: string
  phone: string
  linkedin?: string
  github?: string
  summary: string
  experience: string
  education: string
  skills: string
  template: string
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const data: ResumeData = req.body

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return res.status(400).json({ 
        message: 'Missing required fields: fullName, email, or phone' 
      })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
Create a professional resume in JSON format based on the following user data:

PERSONAL INFORMATION:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- LinkedIn: ${data.linkedin || ' provided'}
- GitHub: ${data.github || 'Not provided'}

PROFESSIONAL SUMMARY:
${data.summary}

WORK EXPERIENCE:
${data.experience}

EDUCATION:
${data.education}

SKILLS:
${data.skills}

CERTIFICATIONS:
${data.certifications ? data.certifications.map(c => `${c.name} - ${c.issuer} (${c.year})`).join('\n') : 'None provided'}

ACHIEVEMENTS:
${data.achievements ? data.achievements.map(a => `${a.title} (${a.year})`).join('\n') : 'None provided'}

TEMPLATE PREFERENCE: ${data.template}

INSTRUCTIONS:
1. Parse the work experience into structured entries with title, company, duration, and description
2. Parse education into structured entries with degree, institution, and year
3. Parse skills into an array of individual skills
4. Include provided certifications and achievements
5. Create a compelling professional summary based on the provided information
6. Ensure the JSON is valid and properly formatted
7. Make the resume professional and tailored to the user's background

Return ONLY a valid JSON object with this exact structure:
{
  "personalInfo": {
    "name": "${data.fullName}",
    "email": "${data.email}",
    "phone": "${data.phone}",
    "linkedin": "${data.linkedin || ''}",
    "github": "${data.github || ''}"
  },
  "summary": "Professional summary based on the provided background",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Start Date - End Date",
      "description": "Job description and achievements"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "year": "Graduation Year"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuer",
      "year": "Year"
    }
  ],
  "achievements": [
    {
      "title": "Achievement Title",
      "year": "Year"
    }
  ]
}
`

    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    // Extract JSON from response
    let jsonStr = response.trim()
    
    // Remove markdown code blocks if present
    jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    
    // Find JSON object
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not extract valid JSON from response')
    }
    
    const resume = JSON.parse(jsonMatch[0])
    
    // Ensure all required fields are present
    const validatedResume = {
      personalInfo: {
        name: resume.personalInfo?.name || data.fullName,
        email: resume.personalInfo?.email || data.email,
        phone: resume.personalInfo?.phone || data.phone,
        linkedin: resume.personalInfo?.linkedin || data.linkedin || '',
        github: resume.personalInfo?.github || data.github || ''
      },
      summary: resume.summary || data.summary || 'Professional with relevant experience',
      experience: Array.isArray(resume.experience) ? resume.experience : [],
      education: Array.isArray(resume.education) ? resume.education : [],
      skills: Array.isArray(resume.skills) ? resume.skills : 
              (data.skills ? data.skills.split(',').map((s: string) => s.trim()) : []),
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      achievements: Array.isArray(data.achievements) ? data.achievements : []
    }
    
    res.status(200).json({ resume: validatedResume })
    
  } catch (error: any) {
    console.error('Error generating resume:', error)
    
    // Return structured error response
    let errorMessage = 'Error generating resume'
    let errorType = 'server_error'
    
    if (error.message?.includes('API key')) {
      errorMessage = 'Invalid Gemini API key configuration'
      errorType = 'authentication_error'
    } else if (error.message?.includes('quota')) {
      errorMessage = 'API quota exceeded. Please try again later'
      errorType = 'quota_error'
    } else if (error.message?.includes('503') || error.message?.includes('overloaded')) {
      errorMessage = 'AI service temporarily unavailable. Please try again'
      errorType = 'service_unavailable'
    }
    
    res.status(error.status || 500).json({ 
      message: errorMessage,
      type: errorType
    })
  }
}
