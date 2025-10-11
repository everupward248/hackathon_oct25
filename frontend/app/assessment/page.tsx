'use client';

import { Box } from '@mui/material';
import { AssessmentWizard } from '@/components/assessment/AssessmentWizard';

export default function AssessmentPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <AssessmentWizard />
    </Box>
  );
}
