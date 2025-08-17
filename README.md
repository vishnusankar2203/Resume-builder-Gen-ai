# AI Resume Builder

A modern, AI-powered resume builder built with Next.js, TypeScript, and OpenAI.

## Features

- 🤖 AI-powered resume generation using OpenAI GPT
- 🎨 Multiple professional templates (Modern, Classic, Minimal)
- 📱 Responsive design with Tailwind CSS
- ⚡ Real-time preview
- ⬇️ Download as HTML
- 🎯 Clean and intuitive interface

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-genai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Gemini API key:
```
GEMINI_API_KEY=your_Gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```



## Project Structure

```
resume-genai/
├── pages/              # Next.js pages and API routes
├── components/        # Reusable React components
├── styles/             # Global styles and Tailwind config
├── public/             # Static assets
└── README.md          # Project documentation
```

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API
- React Hook Form
- Lucide React (icons)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
