# Cayman Islands Lifestyle-Career Mapping Platform

## 🎯 Frontend-Only Prototyping Approach

**Our Team's Mission**: Build a beautiful, intuitive Next.js/React frontend prototype with Material UI to help Caymanians map their lifestyle goals to career opportunities.

### Development Approach
- **Frontend-Only Prototype**: Next.js 14 + TypeScript + Material UI with client-side logic and mock data
- **Design System**: Caribbean-inspired Material UI theme with custom components
- **Mock Data**: Using sample job postings and client-side calculations for demonstration
- **Future Backend**: API integration ready (structure in place for future Flask/PostgreSQL backend)

### Project Structure
```
hackathon_oct25/
├── backend/              # Future backend (currently unused)
│   └── data/            # Job postings CSV/Excel for reference
├── frontend/            # Next.js app (MAIN FOCUS)
│   ├── app/             # Pages and routing
│   ├── components/      # React components
│   │   └── ui/          # Material UI custom components
│   ├── theme/           # Material UI theme configuration
│   ├── lib/             # Utilities and API clients (ready for backend)
│   └── types/           # TypeScript definitions
└── claude.md           # This file
```

### 🚀 Getting Started (Frontend Setup)

1. **Navigate to frontend directory**: `cd frontend`
2. **Install dependencies**: `npm install` (Material UI, fonts, and all dependencies already configured)
3. **Run dev server**: `npm run dev` (opens on `localhost:3000`)
4. **View design system**: Check `DESIGN_SYSTEM.md` and `DESIGN_SYSTEM_QUICK_START.md` for component usage
5. **Mock data approach**: Currently using client-side sample data (ready for future API integration)

---

## Hackathon Challenge Overview

**Objective**: Design and prototype a platform that helps Caymanians map their lifestyle goals to career opportunities.

**Key Resources**:
- 14,036 job postings dataset (salary range: KYD $2,160 - $536,640)
- Comprehensive cost of living data
- Local economic indicators (3.1% GDP growth, 2.4% unemployment)
- Geographic distribution: George Town dominates with 76.5% of opportunities

---

## Platform Concept: Lifestyle-First Career Planning

### Core Philosophy
Flip traditional career planning by starting with **"What kind of life do you want to live?"** in the Cayman Islands, then matching users to viable career paths that can support those lifestyle goals.

---

## Key Components Required

### 1. Lifestyle Assessment Engine
- Interactive questionnaire capturing:
  - Housing preferences (type, location)
  - Family goals and size
  - Entertainment and leisure activities
  - Travel aspirations
  - Priority weighting system
- Cost calculation for desired lifestyle using Cayman-specific data
- Financial requirements output

### 2. Career Opportunity Matching System
- Algorithm mapping lifestyle financial requirements to suitable job roles
- Integration with 14,036 job postings dataset
- Filtering by:
  - Salary ranges
  - Geographic location (George Town, etc.)
  - Education level (high school to doctoral)
  - Experience requirements
- Real-time matching with scoring system

### 3. Economic Feasibility Calculator
- Cost of living integration:
  - Housing: CI$1,517-$4,003/month
  - Utilities: $349-$522/month
  - Other living expenses
- Salary-to-lifestyle gap analysis
- Financial timeline projections
- "What if" scenario modeling

### 4. Career Pathway Visualization
- Interactive career progression maps
- Skills development recommendations
- Education pathway integration
- Advancement opportunity visualization
- Timeline to reach lifestyle goals

### 5. Local Economic Context Integration
- Cayman Islands economic indicators
- Industry growth projections:
  - Financial Services: 30%+ of GDP
  - Tourism sector opportunities
  - Construction industry
- Market demand insights from job posting trends

---

## Unique Value Proposition

1. **Localized for Cayman Islands**: Uses actual local salary data, cost of living, and economic conditions
2. **Lifestyle-Centric**: Starts with life goals rather than career goals
3. **Economic Viability Focus**: Ensures lifestyle goals are financially achievable
4. **Skills Gap Identification**: Shows exact education/training needed
5. **Data-Driven**: Based on 14k+ real job postings and actual economic data

---

## Target User Journey

1. **Lifestyle Goal Definition**
   - User specifies desired living situation
   - Location preferences
   - Family and lifestyle priorities

2. **Financial Requirements Calculation**
   - Platform calculates income needed
   - Uses local cost data
   - Displays total monthly/annual requirements

3. **Career Opportunity Discovery**
   - System matches requirements to career paths
   - Shows multiple viable options
   - Ranks by fit score

4. **Skills Gap Analysis**
   - Identifies current vs. required qualifications
   - Shows experience level gaps
   - Education requirements

5. **Development Pathway Creation**
   - Personalized education/training recommendations
   - Career progression plans
   - Timeline to achieve goals

6. **Progress Tracking**
   - Ongoing monitoring
   - Goal achievement tracking
   - Career development milestones

---

## Tech Stack (Frontend-Only Prototype)

### Frontend Stack ✅ IMPLEMENTED
- **Framework**: Next.js 14 (App Router) with TypeScript
- **UI Library**: Material UI (MUI) v7 with custom theme
- **Design System**: Caribbean-inspired color palette, Inter/Poppins fonts
- **Custom Components**: CareerCard, SalaryDisplay, MatchScoreBadge, ProgressCard, PageContainer
- **Data Visualization**: Recharts for charts (ready for career pathway visualizations)
- **State Management**: Zustand for global state
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios configured for future API calls
- **Currency Display**: `decimal.js` for precise financial formatting
- **Icons**: Material UI Icons (@mui/icons-material)

### Data Approach (Prototype)
- **Current**: Client-side mock data and calculations
- **Job Data**: Sample career postings hardcoded in components
- **Cost Calculations**: Cayman Islands cost of living data in constants
- **Matching Logic**: Client-side algorithm for demo purposes

### Future Backend Integration (Ready)
- **API Structure**: TypeScript types and API client utilities already in place
- **Endpoints Ready**: `/api/profiles`, `/api/jobs`, `/api/matching`, `/api/career-pathways`
- **Backend Tech**: Python Flask + PostgreSQL (when implemented)
- **Migration Path**: Replace mock data with API calls (minimal code changes needed)

### Deployment
- **Frontend**: Vercel (one-click deployment)
- **Status**: Ready to deploy as standalone prototype

### API Contract (Future Backend Integration)
API structure defined and ready for future backend implementation:
- `POST /api/profiles` - Submit lifestyle assessment (currently: local storage)
- `GET /api/profiles/:id` - Retrieve lifestyle profile (currently: local storage)
- `POST /api/matching` - Get career matches (currently: client-side algorithm)
- `GET /api/jobs` - List/search job postings (currently: mock data)
- `GET /api/jobs/:id` - Get job details (currently: mock data)
- `GET /api/career-pathways` - Get career progression data (currently: client-side)
- `GET /api/cost-of-living` - Get cost of living data (currently: constants file)

### Completed Features ✅
- ✅ Material UI design system with Caribbean theme
- ✅ Beautiful, intuitive UI/UX with custom components
- ✅ Landing page with feature showcase
- ✅ Career cards with match scores and salary display
- ✅ Mobile-responsive design (all breakpoints)
- ✅ Accessible components (WCAG AA compliant)
- ✅ TypeScript types for all data structures
- ✅ API client utilities ready for backend integration
- ✅ Cost of living constants file with Cayman Islands data
- ✅ Job dataset parsed (200 jobs extracted from CSV)
- ✅ Client-side matching algorithm (salary, location, education fit)
- ✅ Lifestyle cost calculator function

### In Progress 🔄
- 🔄 Zustand store for profile management (state management layer)

### Pending Tasks 📋
- 📋 Assessment wizard with Material UI Stepper
- 📋 Housing step form component
- 📋 Lifestyle needs step form component
- 📋 Career preferences step form component
- 📋 Review and calculate step component
- 📋 Enhance careers page with real job matching (connect to matching algorithm)
- 📋 Add filtering and sorting to careers page (Material UI controls)
- 📋 Career pathway visualizations (Recharts)
- 📋 Skills gap analysis display

---

## Implementation Plan

### Frontend Project Structure ✅ IMPLEMENTED
```
frontend/                            # Next.js 14 App (App Router, no src/)
├── app/
│   ├── page.tsx                    # ✅ Landing page (Material UI)
│   ├── layout.tsx                  # ✅ Root layout with ThemeProvider
│   ├── globals.css                 # Global styles
│   ├── assessment/                 # 🔄 Lifestyle assessment flow
│   │   └── page.tsx               # 📋 Placeholder ready for wizard
│   ├── careers/                    # 🔄 Career matching results
│   │   └── page.tsx               # ✅ Sample cards, 📋 needs real matching
│   ├── pathway/                    # Career progression visualizer
│   │   └── [id]/page.tsx          # 📋 To be built
│   └── dashboard/                  # User dashboard
│       └── page.tsx                # 📋 To be built
├── theme/                           # ✅ Material UI Theme
│   ├── index.ts                    # Main theme export
│   ├── palette.ts                  # Caribbean-inspired colors
│   ├── typography.ts               # Inter, Poppins, Roboto Mono
│   └── components.ts               # Component overrides
├── components/
│   ├── ui/                         # ✅ Material UI Custom Components
│   │   ├── CareerCard.tsx          # Job listing card with match score
│   │   ├── SalaryDisplay.tsx       # Formatted CI$ salary display
│   │   ├── MatchScoreBadge.tsx     # Color-coded match percentage
│   │   ├── ProgressCard.tsx        # Progress tracking card
│   │   ├── PageContainer.tsx       # Consistent page layout
│   │   └── index.ts                # Component exports
│   └── assessment/                 # 📋 Assessment wizard components (pending)
│       ├── AssessmentWizard.tsx    # 📋 Main stepper container
│       ├── HousingStep.tsx         # 📋 Housing preferences form
│       ├── LifestyleNeedsStep.tsx  # 📋 Family & lifestyle form
│       ├── CareerPrefsStep.tsx     # 📋 Career preferences form
│       └── ReviewCalculateStep.tsx # 📋 Summary & cost calculation
├── lib/
│   ├── api/                        # ✅ API client utilities (ready)
│   │   ├── client.ts              # Axios instance
│   │   ├── profiles.ts            # Profile API calls
│   │   ├── jobs.ts                # Jobs API calls
│   │   ├── matching.ts            # Matching API calls
│   │   └── index.ts               # API exports
│   ├── utils/                      # ✅ Utility functions
│   │   ├── formatters.ts          # Currency/number formatting
│   │   ├── lifestyleCostCalculator.ts  # ✅ Cost calculation logic
│   │   └── careerMatchingAlgorithm.ts  # ✅ Matching algorithm
│   ├── constants/                  # ✅ App constants
│   │   └── costOfLiving.ts        # ✅ Cayman Islands cost data
│   └── data/                       # ✅ Mock data
│       └── jobs.ts                 # ✅ 200 jobs from CSV dataset
├── store/                           # 🔄 Zustand state management
│   └── profileStore.ts             # 🔄 Profile state (in progress)
├── types/                           # ✅ TypeScript Definitions
│   ├── api.ts                      # API response types
│   ├── job.ts                      # Job data types & interfaces
│   ├── lifestyle.ts                # Lifestyle profile types
│   └── career.ts                   # Career pathway types
├── public/
│   └── assets/                     # Static assets
├── DESIGN_SYSTEM.md                # ✅ Complete design system spec
├── DESIGN_SYSTEM_QUICK_START.md    # ✅ Quick reference guide
├── package.json                     # All Material UI deps installed
├── tsconfig.json
└── next.config.js
```

---

## Implementation Phases

### Phase 1: Frontend Project Setup ✅ COMPLETED
**Time**: 2-3 hours

1. ✅ **Initialize Next.js project with TypeScript**
   ```bash
   npx create-next-app@latest cayman-career-mapper --typescript --tailwind --app
   cd cayman-career-mapper
   ```

2. ✅ **Install Material UI and dependencies**
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   npm install @mui/icons-material
   npm install @mui/material-nextjs
   npm install @fontsource/inter @fontsource/poppins @fontsource/roboto-mono
   npm install axios recharts decimal.js
   npm install react-hook-form zod @hookform/resolvers
   npm install zustand
   ```

3. ✅ **Create Material UI Theme**
   - Created `theme/` directory with palette, typography, components config
   - Caribbean-inspired color palette (Ocean Blue, Sunset Orange)
   - Custom fonts: Inter (body), Poppins (headings), Roboto Mono (financial data)
   - Component overrides for consistent styling
   - See `DESIGN_SYSTEM.md` for complete specifications

4. ✅ **Set up ThemeProvider in root layout**
   - Wrapped app with Material UI ThemeProvider
   - Added CssBaseline for consistent base styles
   - Imported custom fonts from @fontsource

5. ✅ **Create Custom UI Components**
   - `CareerCard.tsx` - Job listing card with match scores, salary, location
   - `SalaryDisplay.tsx` - Formatted CI$ display with monospace font
   - `MatchScoreBadge.tsx` - Color-coded match percentage badges
   - `ProgressCard.tsx` - Progress tracking cards with linear progress
   - `PageContainer.tsx` - Consistent page layout wrapper

6. ✅ **Set up TypeScript types**
   - Created type definitions in `types/` directory
   - Defined interfaces for Job, Profile, Match, Career, API responses
   - Ready for mock data and future API integration

7. ✅ **Create API client structure** (ready for backend)
   - Set up axios instance in `lib/api/client.ts`
   - Created API helper functions (profiles, jobs, matching)
   - Error handling utilities in place

8. ✅ **Build landing and sample pages**
   - Home page with Material UI components and Caribbean theme
   - Careers page with 3 sample career cards demonstrating design system
   - Assessment page placeholder ready for form implementation

**Deliverable**: ✅ Complete Material UI design system implemented, sample pages live, ready for feature development

---

### Phase 2: Lifestyle Assessment UI 🔄 IN PROGRESS
**Time**: 3-4 hours

**Status**: Core data infrastructure complete, building UI components

1. **Design Assessment Flow** 📋 PENDING
   - Multi-step form (4-5 steps)
   - Step 1: Housing preferences
   - Step 2: Location & commute
   - Step 3: Family & lifestyle needs
   - Step 4: Career preferences
   - Step 5: Review & calculate

2. **Build Assessment Components** 📋 PENDING
   - `AssessmentWizard.tsx` - Main container with Material UI Stepper
   - `HousingStep.tsx` - Housing type and preferences
   - `LifestyleNeedsStep.tsx` - Family, activities, priorities
   - `CareerPreferencesStep.tsx` - Education level, experience, industry
   - `ReviewCalculateStep.tsx` - Summary and cost calculation
   - Material UI Stepper progress indicator

3. ✅ **Client-Side Cost Calculator** COMPLETED
   - `calculateLifestyleCost()` helper function implemented
   - Input: User preferences (housing, family, lifestyle)
   - Output: Estimated monthly/annual cost breakdown
   - Real-time cost preview capability
   - Uses Cayman Islands cost data from constants:
     - Housing: CI$1,200-$5,000/month (varies by type/location)
     - Utilities: $250-$522/month
     - Food, transport, entertainment, childcare, etc.
   - Location: `lib/utils/lifestyleCostCalculator.ts`

4. **Data Handling for Profile Submission** 🔄 IN PROGRESS
   - 🔄 Zustand store for profile state management
   - ✅ Cost calculation logic complete
   - 📋 Store profile in Zustand state (in progress)
   - 📋 Handle loading states with Material UI CircularProgress
   - 📋 Show validation messages with Material UI alerts
   - 📋 Navigate to career matching with profile data

**Completed Sub-Tasks**:
- ✅ Cost of living constants file (`lib/constants/costOfLiving.ts`)
- ✅ Lifestyle cost calculator function with breakdown
- ✅ TypeScript interfaces for lifestyle profile

**Deliverable**: Functional lifestyle assessment UI with client-side data handling (ready for future API integration)

---

### Phase 3: Career Matching Results UI 🔄 IN PROGRESS
**Time**: 3-4 hours

**Status**: Core algorithm and data ready, enhancing UI

1. ✅ **TypeScript Interfaces Defined** COMPLETED
   ```typescript
   interface MatchCriteria {
     minSalary: number;
     preferredLocations: string[];
     educationLevel: string;
     experienceYears: number;
   }

   interface ScoredMatch {
     job: Job;
     matchScore: number;
     salaryFit: number;
     locationFit: number;
     educationFit: number;
   }
   ```
   - Location: `types/job.ts`, `types/lifestyle.ts`

2. **Build Results Display Components** 🔄 PARTIAL
   - ✅ `CareerCard.tsx` - Individual job card component (complete)
   - ✅ Basic careers page with sample data
   - 📋 `FilterPanel.tsx` - Client-side filtering controls (pending)
   - 📋 `SortControls.tsx` - Sort by salary, match score, etc. (pending)
   - 📋 Connect to real matching algorithm (pending)
   - 📋 Career card grid layout with pagination (pending)
   - 📋 Job details modal/page (Material UI dialog) (pending)

3. ✅ **Client-Side Matching Algorithm** COMPLETED
   - Implemented matching logic in TypeScript
   - Scores jobs based on:
     - Salary fit (40% weight) - how well salary meets requirements
     - Location fit (30% weight) - preferred location matching
     - Education fit (30% weight) - education level compatibility
   - Calculates match percentage (0-100)
   - Filters job dataset based on lifestyle requirements
   - Sorts by match score by default
   - Location: `lib/utils/careerMatchingAlgorithm.ts`

4. **Interactive Features** 📋 PENDING
   - 📋 Filter by salary range (Material UI Slider)
   - 📋 Filter by location (Material UI Autocomplete multi-select)
   - 📋 Filter by industry (Material UI Chips)
   - 📋 Sort by match score, salary, etc. (Material UI Select)
   - 📋 Save favorite jobs to local storage
   - 📋 View job details modal/page (Material UI Dialog)

**Completed Sub-Tasks**:
- ✅ Job dataset extracted (200 jobs from CSV)
- ✅ Job data types and interfaces
- ✅ Matching algorithm with scoring system
- ✅ CareerCard component with match score display

**Deliverable**: Functional career matching results UI with client-side algorithm (ready for future API integration)

**Note**: Matching algorithm currently client-side for demo; can be moved to backend later

---

### Phase 4: Career Pathway Visualization UI (Day 2 Afternoon)
**Time**: 4-5 hours

1. **Define Career Progression Types**
   ```typescript
   interface CareerPathway {
     currentRole: string;
     targetRole: string;
     intermediateSteps: Step[];
     timeline: string;
     totalCostOfEducation: number;
   }

   interface Step {
     role: string;
     salary: number;
     requiredEducation: string[];
     requiredSkills: string[];
     timeToAchieve: string;
   }
   ```

2. **Create Pathway Visualizer Components**
   - `CareerPathwayGraph.tsx` - Visual flowchart using D3.js or custom SVG
   - `PathwayTimeline.tsx` - Horizontal timeline view
   - `StepCard.tsx` - Individual career step component
   - Interactive nodes (hover/click for details)
   - Show:
     - Current position
     - Intermediate roles
     - Target role
     - Education requirements at each step
     - Estimated timeline

3. **Skills Gap Display**
   - `SkillsGapAnalysis.tsx` component
   - Display required vs. current skills
   - Visual progress indicators
   - Education/certification recommendations
   - Time/cost estimates (from backend)

4. **Financial Projection Charts**
   - `FinancialProjection.tsx` component using Recharts
   - Line chart: Salary growth over time
   - Bar chart: Cost of education vs. salary increase
   - Break-even point visualization
   - Lifestyle affordability timeline
   - Interactive tooltips

5. **Data Management**
   - Generate pathway data client-side based on job requirements
   - Calculate progression timeline and salary growth
   - Estimate education costs from constants
   - Handle loading states with Material UI skeleton
   - Error handling with Material UI alerts

**Deliverable**: Interactive career pathway visualization with client-side data generation (ready for future API integration)

**Note**: Pathway calculation currently client-side for demo; can be moved to backend later

---

### Phase 5: Dashboard & Polish (Day 3 Morning)
**Time**: 3-4 hours

1. **Build User Dashboard**
   - Save multiple lifestyle profiles
   - Compare different career paths side-by-side
   - Track saved jobs/careers
   - Progress tracking (if returning user)

2. **Create Comparison Tools**
   - `ComparisonView.tsx` component
   - Side-by-side career path comparison
   - Pros/cons for each path
   - Financial comparison
   - Timeline comparison

3. **Add Export/Share Features**
   - Export career plan as PDF
   - Share link to specific career pathway
   - Print-friendly view

4. **Polish UI/UX**
   - Consistent design system
   - Loading states and animations
   - Error handling and validation messages
   - Mobile-responsive design
   - Accessibility improvements (ARIA labels, keyboard navigation)

5. **Add Demo/Example Data**
   - Pre-populated assessment for demo
   - Example career pathways
   - Sample user stories:
     - "Recent graduate wants to buy a house in George Town"
     - "Professional wants career change while maintaining lifestyle"
     - "Entry-level worker planning for family"

**Deliverable**: Polished, demo-ready application

---

### Phase 6: Testing & Deployment (Day 3 Afternoon)
**Time**: 2-3 hours

1. **Algorithm Testing**
   - Verify matching algorithm accuracy
   - Test edge cases (very high/low lifestyle costs)
   - Validate salary calculations
   - Test with different user profiles

2. **Data Validation**
   - Verify cost calculations match real Cayman Islands data
   - Check job data accuracy
   - Validate financial projections

3. **Responsiveness Testing**
   - Mobile devices (iOS, Android)
   - Tablets
   - Desktop browsers
   - Different screen sizes

4. **Deploy to Vercel**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   vercel deploy --prod
   ```

5. **Prepare Demo Presentation**
   - Create demo script
   - Prepare user story walkthroughs
   - Screenshot key features
   - Practice pitch (problem → solution → demo)

**Deliverable**: Deployed application + demo presentation ready

---

## Key Features Summary

### Must-Have (MVP)
- ✅ Interactive lifestyle assessment questionnaire
- ✅ Real-time cost calculator (CI$ specific)
- ✅ Smart career matching with jobs dataset
- ✅ Career match results display
- ✅ Basic skills gap identification
- ✅ Financial feasibility analysis

### Should-Have
- ✅ Visual career pathway mapper
- ✅ Geographic filtering (George Town, etc.)
- ✅ Education level matching
- ✅ Comparison tools
- ✅ Mobile-responsive design

### Nice-to-Have (if time permits)
- 🔲 User accounts and saved profiles
- 🔲 Interactive map visualization
- 🔲 Industry growth trend charts
- 🔲 PDF export functionality
- 🔲 Social sharing features
- 🔲 Integration with local education providers

---

## Data Schema

### jobs table
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT,
  salary_min NUMERIC,
  salary_max NUMERIC,
  location TEXT,
  education_level TEXT,
  experience_years INTEGER,
  industry TEXT,
  description TEXT,
  posted_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### lifestyle_profiles table
```sql
CREATE TABLE lifestyle_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  housing_type TEXT,
  location_preference TEXT[],
  family_size INTEGER,
  priorities JSONB,
  monthly_cost NUMERIC,
  annual_cost NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### career_matches table
```sql
CREATE TABLE career_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES lifestyle_profiles(id),
  job_id UUID REFERENCES jobs(id),
  match_score NUMERIC,
  salary_fit NUMERIC,
  location_fit NUMERIC,
  education_fit NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Cost of Living Data (Cayman Islands)

### Housing
- 1-bedroom apartment (city center): CI$1,800-$2,500/month
- 3-bedroom apartment (city center): CI$3,500-$5,000/month
- 1-bedroom apartment (outside center): CI$1,200-$1,800/month

### Utilities
- Basic utilities (electricity, water, garbage): CI$250-$400/month
- Internet: CI$75-$125/month
- Mobile phone: CI$50-$100/month

### Transportation
- Monthly public transport pass: CI$100
- Gasoline: CI$1.50-$2.00/liter
- Car insurance: CI$1,500-$3,000/year

### Food & Dining
- Groceries (single person): CI$400-$600/month
- Meal at inexpensive restaurant: CI$15-$25
- Meal for 2 at mid-range restaurant: CI$80-$120

### Other
- Gym membership: CI$80-$150/month
- Cinema ticket: CI$12-$15
- Childcare: CI$800-$1,200/month per child

---

## Job Market Dataset Insights

- **Total Job Postings**: 14,036
- **Salary Range**: KYD $2,160 - $536,640
- **Top Location**: George Town (76.5% of opportunities)
- **Education Levels**: High school to doctoral degrees
- **Top Industries**:
  - Financial Services (30%+ of GDP)
  - Tourism & Hospitality
  - Construction
  - Healthcare
  - Technology

---

## Economic Context (Cayman Islands)

- **GDP Growth**: 3.1%
- **Unemployment Rate**: 2.4%
- **Key Industries**:
  - Financial Services: 30%+ of GDP
  - Tourism: Major employer
  - Construction: Growing sector
- **Average Salary**: Varies widely by sector (CI$40k-$120k+)
- **Cost of Living Index**: High (comparable to major US cities)

---

## Demo Script Ideas

### User Story 1: Recent Graduate
**Profile**: Sarah, 23, recent university graduate
- **Lifestyle Goal**: Live in small apartment in George Town, enjoy social activities, save for future
- **Required Income**: CI$3,500/month (CI$42k/year)
- **Matched Careers**: Entry-level finance, administrative roles, tourism management
- **Pathway**: Start in entry role → gain experience → move to mid-level position within 3-5 years

### User Story 2: Career Changer
**Profile**: Michael, 35, wants career change from tourism to finance
- **Lifestyle Goal**: Maintain current 3-bedroom home, support family of 4
- **Required Income**: CI$7,000/month (CI$84k/year)
- **Skills Gap**: Needs finance certifications (CFA, accounting)
- **Pathway**: Take night classes → get certification → transition to finance role over 2 years

### User Story 3: Ambitious Professional
**Profile**: Jessica, 28, wants rapid career advancement
- **Lifestyle Goal**: Upscale apartment, frequent travel, luxury lifestyle
- **Required Income**: CI$10,000+/month (CI$120k+/year)
- **Matched Careers**: Senior financial analyst, management roles, specialized consulting
- **Pathway**: Current mid-level role → get MBA → move to senior position within 5 years

---

## Success Metrics for Hackathon Judges

1. **Innovation**: Unique lifestyle-first approach vs. traditional career planning
2. **Local Relevance**: Uses actual Cayman Islands data (jobs, costs, economic context)
3. **User Experience**: Intuitive, visually appealing, mobile-responsive
4. **Technical Implementation**: Clean code, scalable architecture, proper data handling
5. **Practical Value**: Genuinely useful tool for Caymanians
6. **Completeness**: Functional prototype covering key features
7. **Demo Quality**: Clear presentation showing problem → solution → impact

---

## Next Steps

1. Review and approve this plan
2. Set up development environment
3. Create GitHub repository
4. Begin Phase 1 implementation
5. Daily standups to track progress
6. Iterative testing throughout development
7. Final demo preparation

---

## Resources & Links

### Data Sources
- Job Postings Dataset: `backend/data/Job-Postings-Data-Request-Hackathon.xlsx` (for reference)
- Cayman Islands Economic Data: [ESO Official Site](https://www.eso.ky)
- Cost of Living Sources: Numbeo, Expatistan, Living Cost comparisons

### Documentation (Project-Specific)
- **Design System**: `frontend/DESIGN_SYSTEM.md` - Complete Material UI design system specification
- **Quick Start Guide**: `frontend/DESIGN_SYSTEM_QUICK_START.md` - Component usage examples
- **Custom Components**: `frontend/components/ui/` - CareerCard, SalaryDisplay, etc.

### Tech Stack Documentation
- [Next.js Docs](https://nextjs.org/docs) - Framework
- [Material UI Docs](https://mui.com/material-ui/) - UI library
- [Material Icons](https://mui.com/material-ui/material-icons/) - Icon library
- [Recharts Docs](https://recharts.org) - Data visualization
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

---

## Notes & Considerations

- Focus on MVP features first, then iterate
- Keep UI simple and intuitive for demo
- Ensure calculations are accurate and defensible
- Have backup plan if API/database issues during demo
- Prepare offline demo version as fallback
- Test on multiple devices before presentation
- Practice demo walkthrough multiple times
- Time demo to 5-7 minutes with Q&A buffer

---

*Last Updated: 2025-10-11*
