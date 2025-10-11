'use client';

import { Typography, Box } from '@mui/material';
import { PageContainer } from '@/components/ui';

export default function AssessmentPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PageContainer>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Lifestyle Assessment
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Assessment form coming soon...
        </Typography>
      </PageContainer>
    </Box>
  );
}
