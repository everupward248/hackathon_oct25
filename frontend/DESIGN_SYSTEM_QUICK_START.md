# Material UI Design System - Quick Start Guide

## Setup Complete ✓

Your Material UI design system is fully configured and ready to use!

## What's Been Implemented

### 1. Theme Configuration
- **Location**: `frontend/theme/`
- **Files**:
  - `palette.ts` - Color definitions
  - `typography.ts` - Font and text styles
  - `components.ts` - Component overrides
  - `index.ts` - Main theme export

### 2. Custom Fonts
Fonts are loaded in `app/layout.tsx`:
- **Inter**: Body text (400, 500, 600, 700)
- **Poppins**: Headings (500, 600, 700)
- **Roboto Mono**: Financial data (400, 600)

### 3. Custom UI Components
**Location**: `frontend/components/ui/`

Available components:
```typescript
import {
  CareerCard,
  MatchScoreBadge,
  SalaryDisplay,
  ProgressCard,
  PageContainer,
} from '@/components/ui';
```

### 4. Updated Pages
- **Home page** (`app/page.tsx`) - Material UI landing page
- **Assessment page** (`app/assessment/page.tsx`) - Ready for form implementation
- **Careers page** (`app/careers/page.tsx`) - Sample career cards displayed

---

## Quick Usage Examples

### Using Material UI Components

```tsx
'use client';

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';
import { WorkOutline } from '@mui/icons-material';

export default function MyComponent() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Component
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Box>
  );
}
```

### Using Custom Components

#### CareerCard
```tsx
import { CareerCard } from '@/components/ui';

<CareerCard
  title="Software Engineer"
  company="Tech Company"
  salaryMin={60000}
  salaryMax={90000}
  location="George Town"
  matchScore={85}
  educationLevel="Bachelor's Degree"
  industry="Technology"
  onViewDetails={() => console.log('View details')}
  onSave={() => console.log('Save')}
/>
```

#### SalaryDisplay
```tsx
import { SalaryDisplay } from '@/components/ui';

<SalaryDisplay
  amount={75000}
  period="year"
  size="large"
/>
// Outputs: CI$75,000 per year
```

#### MatchScoreBadge
```tsx
import { MatchScoreBadge } from '@/components/ui';

<MatchScoreBadge score={92} size="medium" />
// Outputs: 92% Match (with color coding)
```

#### PageContainer
```tsx
import { PageContainer } from '@/components/ui';

<PageContainer maxWidth="lg">
  {/* Your page content */}
</PageContainer>
```

#### ProgressCard
```tsx
import { ProgressCard } from '@/components/ui';

<ProgressCard
  title="Career Progress"
  progress={75}
  description="Almost there!"
  color="success"
/>
```

---

## Color Palette Reference

### Primary (Caribbean Blue)
```tsx
color="primary.main"      // #0277BD - Main actions
color="primary.light"     // #58A5F0 - Hover states
color="primary.dark"      // #01579B - Active states
```

### Secondary (Sunset Orange)
```tsx
color="secondary.main"    // #FF6F00 - CTAs
color="secondary.light"   // #FFA040 - Light accents
color="secondary.dark"    // #C43E00 - Active states
```

### Semantic Colors
```tsx
color="success.main"      // #2E7D32 - Success states
color="warning.main"      // #F57C00 - Warnings
color="error.main"        // #D32F2F - Errors
```

### Text Colors
```tsx
color="text.primary"      // #212121 - Main text
color="text.secondary"    // #757575 - Secondary text
color="text.disabled"     // #BDBDBD - Disabled text
```

---

## Typography Usage

```tsx
<Typography variant="h1">Page Title</Typography>        // 48px, Poppins, 700
<Typography variant="h2">Section Header</Typography>    // 40px, Poppins, 600
<Typography variant="h3">Subsection</Typography>        // 32px, Poppins, 600
<Typography variant="h4">Card Title</Typography>        // 24px, Poppins, 600
<Typography variant="h5">Component Header</Typography>  // 20px, Inter, 500
<Typography variant="h6">Small Header</Typography>      // 16px, Inter, 500
<Typography variant="body1">Main text</Typography>      // 16px, Inter, 400
<Typography variant="body2">Secondary text</Typography> // 14px, Inter, 400
<Typography variant="caption">Small text</Typography>   // 12px, Inter, 400
```

---

## Spacing System

Material UI uses an 8px base unit. Use the `sx` prop:

```tsx
<Box sx={{
  p: 3,      // padding: 24px (3 × 8px)
  mt: 2,     // margin-top: 16px (2 × 8px)
  mb: 4,     // margin-bottom: 32px (4 × 8px)
  px: 2,     // padding left & right: 16px
  py: 1,     // padding top & bottom: 8px
}} />
```

---

## Responsive Breakpoints

```tsx
<Box sx={{
  fontSize: '14px',                              // Default (mobile)
  [theme.breakpoints.up('sm')]: {               // ≥600px
    fontSize: '16px',
  },
  [theme.breakpoints.up('md')]: {               // ≥900px
    fontSize: '18px',
  },
  [theme.breakpoints.up('lg')]: {               // ≥1200px
    fontSize: '20px',
  },
}} />

// Or use the shorthand:
<Typography sx={{
  fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }
}} />
```

---

## Icons

```tsx
import {
  WorkOutline,
  LocationOnOutlined,
  SchoolOutlined,
  AttachMoneyOutlined,
} from '@mui/icons-material';

<WorkOutline sx={{ fontSize: 24, color: 'primary.main' }} />
```

---

## Common Patterns

### Hover Effect Card
```tsx
<Card
  elevation={2}
  sx={{
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 4,
    },
  }}
>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Responsive Grid
```tsx
<Grid container spacing={3}>
  <Grid item xs={12} md={6} lg={4}>
    {/* Content - Full width mobile, half tablet, third desktop */}
  </Grid>
</Grid>
```

### Flexible Stack
```tsx
<Stack
  direction={{ xs: 'column', sm: 'row' }}  // Vertical on mobile, horizontal on tablet+
  spacing={2}                               // 16px gap
  alignItems="center"
>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Stack>
```

### Financial Display
```tsx
<Box
  component="span"
  sx={{
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'success.main',
  }}
>
  CI${(75000).toLocaleString()}
</Box>
```

---

## Running the App

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see your Material UI design system in action!

---

## Next Steps

1. **Build Assessment Form Components** (Phase 2)
   - Multi-step wizard
   - Form fields with validation
   - Progress indicator

2. **Enhance Career Matching UI** (Phase 3)
   - Filter panel
   - Sort controls
   - Pagination

3. **Create Career Pathway Visualizations** (Phase 4)
   - Pathway graph component
   - Timeline visualization
   - Skills gap display

---

## Resources

- [Material UI Documentation](https://mui.com/material-ui/)
- [Full Design System Spec](./DESIGN_SYSTEM.md)
- [Material Icons](https://mui.com/material-ui/material-icons/)
- [Custom Components Source](./components/ui/)

---

**Questions?** Check the full design system documentation in `DESIGN_SYSTEM.md`
