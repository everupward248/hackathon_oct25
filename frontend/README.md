# Cayman Career Mapper - Frontend

A Next.js 14 application that helps Caymanians map their lifestyle goals to career opportunities by consuming a Flask REST API.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data Visualization**: Recharts
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Currency**: Decimal.js

## Prerequisites

- Node.js 18+ and npm
- Backend Flask API running on `http://localhost:5000`

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and set `NEXT_PUBLIC_API_URL` to your backend API URL.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── assessment/        # Lifestyle assessment flow
│   └── careers/           # Career matching results
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── lib/                   # Utilities and API
│   ├── api/              # API client and services
│   └── utils.ts          # Utility functions
├── types/                 # TypeScript type definitions
│   ├── job.ts
│   ├── lifestyle.ts
│   ├── career.ts
│   └── api.ts
└── public/                # Static assets
```

## API Integration

The frontend communicates with the Flask backend via RESTful HTTP calls:

- **Base URL**: `http://localhost:5000/api` (configurable via `.env.local`)
- **CORS**: Backend must enable CORS for `http://localhost:3000`
- **Client**: Axios with interceptors for error handling

### Main API Endpoints

- `POST /api/profiles` - Create lifestyle profile
- `GET /api/profiles/:id` - Get profile
- `POST /api/matching` - Get career matches
- `GET /api/jobs` - List jobs
- `GET /api/jobs/:id` - Get job details
- `GET /api/career-pathways` - Get career progression

## Development

### Add shadcn/ui Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
# etc.
```

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-api.com/api`
4. Deploy

## Features

- ✅ Lifestyle assessment multi-step form
- ✅ Career matching with 14,000+ Cayman Islands jobs
- ✅ Career pathway visualization
- ✅ Skills gap analysis
- ✅ Financial projections and cost calculations
- ✅ Mobile-responsive design

## Contributing

This is a hackathon project for the Cayman Islands Tech Futures Hackathon.
