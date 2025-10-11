'use client';

import { Typography, Box, Grid } from '@mui/material';
import { PageContainer, CareerCard } from '@/components/ui';

// Sample data for demonstration
const sampleCareers = [
  {
    id: '1',
    title: 'Financial Analyst',
    company: 'Cayman Financial Group',
    salaryMin: 55000,
    salaryMax: 85000,
    location: 'George Town',
    matchScore: 92,
    educationLevel: "Bachelor's Degree",
    industry: 'Financial Services',
  },
  {
    id: '2',
    title: 'Senior Software Engineer',
    company: 'Tech Solutions CI',
    salaryMin: 70000,
    salaryMax: 110000,
    location: 'George Town',
    matchScore: 88,
    educationLevel: "Bachelor's Degree",
    industry: 'Technology',
  },
  {
    id: '3',
    title: 'Hotel Operations Manager',
    company: 'Caribbean Resorts',
    salaryMin: 50000,
    salaryMax: 75000,
    location: 'Seven Mile Beach',
    matchScore: 75,
    educationLevel: "Bachelor's Degree",
    industry: 'Tourism & Hospitality',
  },
];

export default function CareersPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PageContainer>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          Career Matches
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Explore career opportunities that match your lifestyle goals
        </Typography>

        <Grid container spacing={3}>
          {sampleCareers.map((career) => (
            <Grid item xs={12} md={6} lg={4} key={career.id}>
              <CareerCard
                title={career.title}
                company={career.company}
                salaryMin={career.salaryMin}
                salaryMax={career.salaryMax}
                location={career.location}
                matchScore={career.matchScore}
                educationLevel={career.educationLevel}
                industry={career.industry}
                onViewDetails={() => console.log('View details:', career.id)}
                onSave={() => console.log('Save career:', career.id)}
              />
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </Box>
  );
}
