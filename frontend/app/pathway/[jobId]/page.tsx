'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Chip,
  Grid,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ArrowBack,
  WorkOutline,
  TrendingUp,
  School,
  Timeline,
  Assessment,
  AccountBalance,
} from '@mui/icons-material';
import { SAMPLE_JOBS } from '@/lib/data/jobs';
import { useProfileStore } from '@/lib/store/profileStore';
import {
  generateCareerPathway,
  generateSkillsGap,
  generateFinancialProjections,
} from '@/lib/algorithms/pathwayGenerator';
import { CareerPathwayGraph } from '@/components/pathway/CareerPathwayGraph';
import { PathwayTimeline } from '@/components/pathway/PathwayTimeline';
import { SkillsGapAnalysis } from '@/components/pathway/SkillsGapAnalysis';
import { FinancialProjection } from '@/components/pathway/FinancialProjection';
import { formatCurrency } from '@/lib/constants';
import { PageContainer } from '@/components/ui';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pathway-tabpanel-${index}`}
      aria-labelledby={`pathway-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PathwayDetailPage() {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const jobId = params.jobId as string;
  const { assessmentData } = useProfileStore();

  // Find the target job
  const targetJob = SAMPLE_JOBS.find((job) => job.id === jobId);

  // Generate pathway data
  const pathwayData = useMemo(() => {
    if (!targetJob) return null;

    // Get current skills from assessment (if available)
    const currentSkills = assessmentData.careerPreferences.preferredIndustries || [];

    // Generate main pathway
    const pathway = generateCareerPathway(
      targetJob,
      SAMPLE_JOBS,
      undefined, // No current role for now
      undefined, // No current salary
      currentSkills
    );

    // Generate skills gap
    const skillsGap = generateSkillsGap(targetJob, pathway, currentSkills);

    // Generate financial projections
    const { projections, metrics } = generateFinancialProjections(
      pathway,
      25, // Assume age 25 starting point
      assessmentData.lifestyle.monthlyCost
        ? assessmentData.lifestyle.monthlyCost * 12
        : undefined
    );

    return {
      pathway,
      skillsGap,
      projections,
      metrics,
    };
  }, [targetJob, assessmentData]);

  if (!targetJob || !pathwayData) {
    return (
      <PageContainer>
        <Container maxWidth="lg">
          <Typography variant="h5">Job not found</Typography>
          <Button startIcon={<ArrowBack />} onClick={() => router.push('/careers')} sx={{ mt: 2 }}>
            Back to Careers
          </Button>
        </Container>
      </PageContainer>
    );
  }

  const { pathway, skillsGap, projections, metrics } = pathwayData;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/careers"
            onClick={(e) => {
              e.preventDefault();
              router.push('/careers');
            }}
          >
            Careers
          </Link>
          <Typography color="text.primary">{targetJob.title}</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Card
          elevation={3}
          sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WorkOutline sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {targetJob.title}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  <Chip label={targetJob.company} variant="outlined" />
                  <Chip label={targetJob.industry} color="primary" variant="outlined" />
                  <Chip label={targetJob.location} variant="outlined" />
                </Stack>
              </Box>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Salary Range
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                    {formatCurrency(targetJob.salaryMin)} - {formatCurrency(targetJob.salaryMax)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    per year
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Experience Required
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    {targetJob.experienceYears}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Education Level
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'info.main' }}>
                    {targetJob.educationLevel}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {targetJob.description && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  {targetJob.description}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Card elevation={2} sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<Timeline />} label="Career Path" iconPosition="start" />
            <Tab icon={<TrendingUp />} label="Progression Timeline" iconPosition="start" />
            <Tab icon={<School />} label="Skills Gap" iconPosition="start" />
            <Tab icon={<AccountBalance />} label="Financial Projection" iconPosition="start" />
          </Tabs>
        </Card>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <CareerPathwayGraph pathway={pathway} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <PathwayTimeline pathway={pathway} variant="timeline" />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <SkillsGapAnalysis skillsGap={skillsGap} showRecommendations />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <FinancialProjection projections={projections} metrics={metrics} currentAge={25} />
        </TabPanel>

        {/* Action Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/careers')}
            fullWidth={false}
          >
            Back to Careers
          </Button>
          <Button
            variant="contained"
            startIcon={<Assessment />}
            onClick={() => router.push('/assessment')}
            fullWidth={false}
          >
            Update Assessment
          </Button>
        </Stack>
      </Container>
    </PageContainer>
  );
}
