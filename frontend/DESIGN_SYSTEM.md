# Material UI Design System - Cayman Islands Career Mapper

## Overview
This design system establishes a cohesive visual language for the Cayman Islands Lifestyle-Career Mapping Platform using Material UI (MUI). The design reflects the Caribbean setting with professional, modern aesthetics suitable for career planning.

---

## Color Palette

### Primary Colors (Ocean & Sky)
Inspired by the Cayman Islands' iconic turquoise waters and tropical sky:

```typescript
primary: {
  main: '#0277BD',      // Deep Caribbean Blue - Main actions, headers
  light: '#58A5F0',     // Light Sky Blue - Hover states, backgrounds
  dark: '#01579B',      // Deep Ocean - Active states, dark themes
  contrastText: '#FFFFFF'
}
```

### Secondary Colors (Sunset & Sand)
Warm accents representing Caribbean sunsets and Seven Mile Beach:

```typescript
secondary: {
  main: '#FF6F00',      // Sunset Orange - CTAs, highlights
  light: '#FFA040',     // Warm Sand - Light accents
  dark: '#C43E00',      // Deep Sunset - Active secondary actions
  contrastText: '#FFFFFF'
}
```

### Success (Growth & Prosperity)
```typescript
success: {
  main: '#2E7D32',      // Caribbean Green - Positive actions, success states
  light: '#60AD5E',     // Light Green - Background highlights
  dark: '#005005',      // Deep Green - Active success states
}
```

### Warning (Attention)
```typescript
warning: {
  main: '#F57C00',      // Tropical Mango - Warnings, important info
  light: '#FFB74D',     // Light Orange - Background warnings
  dark: '#E65100',      // Deep Orange - Critical warnings
}
```

### Error (Critical)
```typescript
error: {
  main: '#D32F2F',      // Coral Red - Errors, destructive actions
  light: '#EF5350',     // Light Red - Error backgrounds
  dark: '#C62828',      // Deep Red - Active error states
}
```

### Neutral Colors (Professional)
```typescript
grey: {
  50: '#FAFAFA',        // Background light
  100: '#F5F5F5',       // Card backgrounds
  200: '#EEEEEE',       // Dividers light
  300: '#E0E0E0',       // Borders
  400: '#BDBDBD',       // Disabled text
  500: '#9E9E9E',       // Secondary text
  600: '#757575',       // Icons
  700: '#616161',       // Body text
  800: '#424242',       // Headings
  900: '#212121',       // Dark text
}
```

### Background Colors
```typescript
background: {
  default: '#FAFAFA',   // Page background
  paper: '#FFFFFF',     // Card/Paper surfaces
  alternate: '#F5F9FC', // Alternate sections (light blue tint)
}
```

---

## Typography

### Font Families
```typescript
fontFamily: {
  primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  secondary: '"Poppins", "Inter", sans-serif', // For headings
  mono: '"Roboto Mono", "Courier New", monospace', // For financial data
}
```

### Type Scale
```typescript
h1: {
  fontSize: '3rem',      // 48px - Page titles
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: '-0.01562em',
  fontFamily: 'Poppins',
}

h2: {
  fontSize: '2.5rem',    // 40px - Section headers
  fontWeight: 600,
  lineHeight: 1.3,
  letterSpacing: '-0.00833em',
  fontFamily: 'Poppins',
}

h3: {
  fontSize: '2rem',      // 32px - Subsection headers
  fontWeight: 600,
  lineHeight: 1.4,
  fontFamily: 'Poppins',
}

h4: {
  fontSize: '1.5rem',    // 24px - Card titles
  fontWeight: 600,
  lineHeight: 1.5,
  fontFamily: 'Poppins',
}

h5: {
  fontSize: '1.25rem',   // 20px - Component headers
  fontWeight: 500,
  lineHeight: 1.5,
}

h6: {
  fontSize: '1rem',      // 16px - Small headers
  fontWeight: 500,
  lineHeight: 1.6,
}

body1: {
  fontSize: '1rem',      // 16px - Main body text
  fontWeight: 400,
  lineHeight: 1.6,
}

body2: {
  fontSize: '0.875rem',  // 14px - Secondary text
  fontWeight: 400,
  lineHeight: 1.5,
}

subtitle1: {
  fontSize: '1rem',      // 16px - Emphasized text
  fontWeight: 500,
  lineHeight: 1.75,
}

subtitle2: {
  fontSize: '0.875rem',  // 14px - Small emphasized text
  fontWeight: 500,
  lineHeight: 1.57,
}

caption: {
  fontSize: '0.75rem',   // 12px - Captions, labels
  fontWeight: 400,
  lineHeight: 1.66,
}

overline: {
  fontSize: '0.75rem',   // 12px - Overline text
  fontWeight: 500,
  lineHeight: 2.66,
  textTransform: 'uppercase',
  letterSpacing: '0.08333em',
}
```

---

## Spacing System

Based on Material UI's 8px grid system:

```typescript
spacing: {
  xs: 4,    // 4px - Tight spacing
  sm: 8,    // 8px - Small gaps
  md: 16,   // 16px - Default spacing
  lg: 24,   // 24px - Section spacing
  xl: 32,   // 32px - Large gaps
  '2xl': 48, // 48px - Major sections
  '3xl': 64, // 64px - Page sections
}
```

### Component Spacing Guidelines
- **Card padding**: `24px` (lg)
- **Section padding**: `48px` (2xl) desktop, `24px` (lg) mobile
- **Button spacing**: `8px` (sm) between buttons
- **Form fields**: `16px` (md) between fields
- **Grid gutters**: `24px` (lg)

---

## Elevation (Shadows)

Material UI's elevation system (0-24):

### Common Elevations
```typescript
elevations: {
  card: 2,              // Standard cards
  cardHover: 4,         // Cards on hover
  modal: 8,             // Modals, dialogs
  drawer: 16,           // Side drawers
  appBar: 4,            // Top navigation
  fab: 6,               // Floating action buttons
}
```

---

## Border Radius

```typescript
borderRadius: {
  xs: '4px',   // Small elements (chips, badges)
  sm: '8px',   // Buttons, inputs
  md: '12px',  // Cards, containers
  lg: '16px',  // Large cards, sections
  xl: '24px',  // Feature cards
  full: '9999px', // Pills, avatars
}
```

---

## Component Specifications

### 1. Buttons

#### Primary Button
```typescript
<Button
  variant="contained"
  color="primary"
  size="large"
>
  Start Assessment
</Button>
```
- **Use case**: Primary CTAs, main actions
- **Height**: 48px (large), 40px (medium), 32px (small)
- **Padding**: 16px horizontal
- **Font**: 16px medium weight
- **Border radius**: 8px

#### Secondary Button
```typescript
<Button
  variant="outlined"
  color="primary"
>
  Learn More
</Button>
```
- **Use case**: Secondary actions, navigation
- **Border**: 2px solid primary color

#### Text Button
```typescript
<Button
  variant="text"
  color="primary"
>
  Skip
</Button>
```
- **Use case**: Tertiary actions, less emphasis

---

### 2. Cards

#### Standard Card
```typescript
<Card
  elevation={2}
  sx={{ borderRadius: '12px' }}
>
  <CardContent sx={{ p: 3 }}>
    {/* Content */}
  </CardContent>
</Card>
```
- **Padding**: 24px
- **Border radius**: 12px
- **Elevation**: 2
- **Hover state**: Elevation 4

#### Career Card
```typescript
<Card
  elevation={2}
  sx={{
    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'grey.200',
    transition: 'all 0.3s',
    '&:hover': {
      elevation: 4,
      borderColor: 'primary.main',
    }
  }}
>
  <CardHeader /> {/* Job title, company */}
  <CardContent /> {/* Details */}
  <CardActions /> {/* Actions */}
</Card>
```

---

### 3. Forms

#### Text Field
```typescript
<TextField
  fullWidth
  variant="outlined"
  label="Your Name"
  placeholder="Enter your name"
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    }
  }}
/>
```
- **Height**: 56px
- **Border radius**: 8px
- **Label**: Floating label
- **Helper text**: 14px grey.600

#### Select/Dropdown
```typescript
<Select
  fullWidth
  variant="outlined"
  label="Education Level"
  sx={{
    borderRadius: '8px',
  }}
>
  <MenuItem value="high-school">High School</MenuItem>
  <MenuItem value="bachelors">Bachelor's Degree</MenuItem>
</Select>
```

#### Slider (for range inputs)
```typescript
<Slider
  value={salaryRange}
  onChange={handleChange}
  valueLabelDisplay="auto"
  min={30000}
  max={150000}
  step={5000}
  marks
  sx={{
    color: 'primary.main',
  }}
/>
```
- **Use case**: Salary range, budget filters
- **Track height**: 4px
- **Thumb size**: 20px

---

### 4. Navigation

#### App Bar
```typescript
<AppBar
  position="fixed"
  elevation={4}
  sx={{
    bgcolor: 'background.paper',
    color: 'text.primary',
  }}
>
  <Toolbar>
    {/* Logo, navigation, user menu */}
  </Toolbar>
</AppBar>
```
- **Height**: 64px desktop, 56px mobile
- **Background**: White with shadow
- **Color**: Dark text (inverted from default)

#### Stepper (for assessment flow)
```typescript
<Stepper
  activeStep={activeStep}
  sx={{
    pt: 3,
    pb: 5,
  }}
>
  <Step>
    <StepLabel>Lifestyle</StepLabel>
  </Step>
  {/* More steps */}
</Stepper>
```

---

### 5. Data Display

#### Chip (for tags, categories)
```typescript
<Chip
  label="Financial Services"
  color="primary"
  variant="outlined"
  size="small"
  sx={{
    borderRadius: '4px',
    fontWeight: 500,
  }}
/>
```

#### Avatar (for company logos)
```typescript
<Avatar
  src={companyLogo}
  alt={companyName}
  sx={{
    width: 48,
    height: 48,
    bgcolor: 'primary.light',
  }}
/>
```

#### Divider
```typescript
<Divider
  sx={{
    my: 2,
    borderColor: 'grey.200',
  }}
/>
```

---

### 6. Feedback Components

#### Alert
```typescript
<Alert
  severity="success"
  sx={{
    borderRadius: '8px',
    mb: 2,
  }}
>
  Profile saved successfully!
</Alert>
```
- **Variants**: success, warning, error, info
- **Border radius**: 8px

#### Progress Indicators
```typescript
<CircularProgress
  color="primary"
  size={40}
/>

<LinearProgress
  variant="determinate"
  value={progress}
  sx={{
    height: 8,
    borderRadius: '4px',
  }}
/>
```

#### Skeleton (loading states)
```typescript
<Skeleton
  variant="rectangular"
  width="100%"
  height={200}
  sx={{ borderRadius: '12px' }}
/>
```

---

## Layout Patterns

### 1. Page Container
```typescript
<Container
  maxWidth="lg"
  sx={{
    py: { xs: 3, md: 6 },
    px: { xs: 2, md: 3 },
  }}
>
  {/* Page content */}
</Container>
```
- **Max width**: 1280px (lg)
- **Padding**: 48px vertical (desktop), 24px (mobile)

### 2. Grid System
```typescript
<Grid container spacing={3}>
  <Grid item xs={12} md={4}>
    {/* Card 1 */}
  </Grid>
  <Grid item xs={12} md={4}>
    {/* Card 2 */}
  </Grid>
  <Grid item xs={12} md={4}>
    {/* Card 3 */}
  </Grid>
</Grid>
```
- **Gutter**: 24px (spacing={3})
- **Breakpoints**: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)

### 3. Stack (for vertical/horizontal layouts)
```typescript
<Stack
  direction={{ xs: 'column', md: 'row' }}
  spacing={2}
  alignItems="center"
>
  {/* Items */}
</Stack>
```

---

## Responsive Breakpoints

```typescript
breakpoints: {
  xs: 0,      // Mobile portrait
  sm: 600,    // Mobile landscape / small tablet
  md: 900,    // Tablet
  lg: 1200,   // Desktop
  xl: 1536,   // Large desktop
}
```

### Mobile-First Approach
```typescript
sx={{
  fontSize: '14px',           // Mobile default
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',         // Tablet+
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '18px',         // Desktop+
  },
}}
```

---

## Animation & Transitions

### Duration
```typescript
transitions: {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  }
}
```

### Common Transitions
```typescript
// Hover effect
sx={{
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 4,
  }
}}

// Fade in
sx={{
  animation: 'fadeIn 0.5s ease-in',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  }
}}
```

---

## Icon System

### Icon Library
Use Material UI Icons (@mui/icons-material)

### Common Icons
```typescript
import {
  WorkOutline,          // Jobs/careers
  HomeOutline,          // Housing
  LocationOnOutline,    // Location
  SchoolOutline,        // Education
  TrendingUpOutline,    // Growth/progress
  AttachMoneyOutline,   // Salary
  FamilyRestroom,       // Family
  DirectionsCar,        // Transportation
  Restaurant,           // Dining
  FitnessCenter,        // Lifestyle
  FlightTakeoff,        // Travel
  CheckCircleOutline,   // Success
  ErrorOutline,         // Error
  InfoOutline,          // Info
} from '@mui/icons-material';
```

### Icon Sizes
```typescript
fontSize: {
  small: 20px,
  medium: 24px,
  large: 32px,
}
```

---

## Special Components

### 1. Salary Display
```typescript
<Box
  component="span"
  sx={{
    fontFamily: 'Roboto Mono',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'success.main',
  }}
>
  CI${salary.toLocaleString()}
</Box>
```

### 2. Match Score Badge
```typescript
<Box
  sx={{
    display: 'inline-flex',
    alignItems: 'center',
    bgcolor: score > 80 ? 'success.light' : 'warning.light',
    color: score > 80 ? 'success.dark' : 'warning.dark',
    px: 2,
    py: 0.5,
    borderRadius: '12px',
    fontWeight: 600,
  }}
>
  {score}% Match
</Box>
```

### 3. Progress Card
```typescript
<Card elevation={2}>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      Career Progress
    </Typography>
    <LinearProgress
      variant="determinate"
      value={75}
      sx={{
        height: 10,
        borderRadius: '5px',
        mb: 1,
      }}
    />
    <Typography variant="body2" color="text.secondary">
      75% Complete
    </Typography>
  </CardContent>
</Card>
```

---

## Accessibility Guidelines

### Color Contrast
- **Text on white**: Minimum contrast ratio 4.5:1 (WCAG AA)
- **Large text**: Minimum contrast ratio 3:1
- **Interactive elements**: Ensure visible focus states

### Focus States
```typescript
sx={{
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: '2px',
  }
}}
```

### ARIA Labels
Always include proper ARIA labels for interactive elements:
```typescript
<IconButton aria-label="close dialog">
  <CloseIcon />
</IconButton>
```

---

## Dark Mode Support (Optional)

```typescript
palette: {
  mode: 'dark',
  primary: {
    main: '#58A5F0',    // Lighter blue for dark mode
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
  },
}
```

---

## Implementation Checklist

### Installation
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @fontsource/inter @fontsource/poppins @fontsource/roboto-mono
```

### Theme Setup
- [ ] Create `theme.ts` with Material UI theme configuration
- [ ] Set up ThemeProvider in root layout
- [ ] Import custom fonts
- [ ] Configure breakpoints and spacing
- [ ] Set up color palette

### Component Library
- [ ] Create reusable component wrappers
- [ ] Build custom variants for common patterns
- [ ] Document component usage
- [ ] Create Storybook stories (optional)

### Testing
- [ ] Test responsive breakpoints
- [ ] Verify color contrast ratios
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Cross-browser testing

---

## File Structure

```
frontend/
├── theme/
│   ├── index.ts                 # Main theme export
│   ├── palette.ts               # Color definitions
│   ├── typography.ts            # Typography config
│   ├── components.ts            # Component overrides
│   └── breakpoints.ts           # Responsive breakpoints
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Custom button variants
│   │   ├── Card.tsx            # Card components
│   │   ├── Form/               # Form components
│   │   └── ...
│   └── ...
└── app/
    └── layout.tsx               # ThemeProvider setup
```

---

## Resources

- [Material UI Documentation](https://mui.com/material-ui/)
- [Material Design Guidelines](https://m3.material.io/)
- [Color Tool](https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors)
- [Accessibility Guidelines](https://mui.com/material-ui/guides/accessibility/)

---

*Last Updated: 2025-10-11*
