'use client';

import React, { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  Alert,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  TrendingUp,
  CompareArrows,
} from '@mui/icons-material';
import { PageContainer } from '@/components/ui';
import { useProfileStore } from '@/lib/store/profileStore';
import { formatCurrency } from '@/lib/constants';

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { savedProfiles } = useProfileStore();

  const profileIds = searchParams.get('profiles')?.split(',') || [];
  const profilesToCompare = savedProfiles.filter((p) => profileIds.includes(p.id));

  if (profilesToCompare.length < 2) {
    return (
      <PageContainer>
        <Container maxWidth="lg">
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Not Enough Profiles to Compare
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              You need at least 2 profiles to compare. Please go back to your dashboard and select
              profiles to compare.
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={() => router.push('/dashboard')}
              sx={{ mt: 2 }}
            >
              Back to Dashboard
            </Button>
          </Alert>
        </Container>
      </PageContainer>
    );
  }

  // Calculate comparison metrics
  const comparison = useMemo(() => {
    return {
      salaries: profilesToCompare.map((p) => p.lifestyleCost.requiredAnnualSalary),
      monthlyCosts: profilesToCompare.map((p) => p.lifestyleCost.monthlyCost),
      matchedJobs: profilesToCompare.map((p) => p.matchedJobs?.length || 0),
      housing: profilesToCompare.map((p) => ({
        bedrooms: p.assessmentData.housing.bedrooms,
        location: p.assessmentData.housing.housingLocation,
      })),
      lifestyle: profilesToCompare.map((p) => ({
        familySize: p.assessmentData.lifestyle.familySize,
        numChildren: p.assessmentData.lifestyle.numChildren,
        transportation: p.assessmentData.lifestyle.transportationType,
      })),
    };
  }, [profilesToCompare]);

  // Find best options
  const lowestSalaryIndex = comparison.salaries.indexOf(Math.min(...comparison.salaries));
  const mostJobsIndex = comparison.matchedJobs.indexOf(Math.max(...comparison.matchedJobs));

  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push('/dashboard')}
            sx={{ mb: 2 }}
          >
            Back to Dashboard
          </Button>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #0277BD 0%, #01579B 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Profile Comparison
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Compare {profilesToCompare.length} lifestyle profiles side-by-side
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {profilesToCompare.map((profile, index) => (
            <Grid item xs={12} md={6} lg={4} key={profile.id}>
              <Card
                elevation={3}
                sx={{
                  border: '2px solid',
                  borderColor:
                    index === lowestSalaryIndex
                      ? 'success.main'
                      : index === mostJobsIndex
                      ? 'primary.main'
                      : 'divider',
                  background:
                    index === lowestSalaryIndex || index === mostJobsIndex
                      ? `linear-gradient(135deg, ${alpha(
                          theme.palette[index === lowestSalaryIndex ? 'success' : 'primary']
                            .main,
                          0.05
                        )} 0%, ${alpha(
                          theme.palette[index === lowestSalaryIndex ? 'success' : 'primary']
                            .main,
                          0.02
                        )} 100%)`
                      : 'background.paper',
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {profile.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(profile.timestamp).toLocaleDateString()}
                      </Typography>
                    </Box>

                    {index === lowestSalaryIndex && (
                      <Chip
                        label="Most Affordable"
                        color="success"
                        size="small"
                        icon={<CheckCircle />}
                      />
                    )}
                    {index === mostJobsIndex && index !== lowestSalaryIndex && (
                      <Chip
                        label="Most Opportunities"
                        color="primary"
                        size="small"
                        icon={<TrendingUp />}
                      />
                    )}

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Required Salary
                      </Typography>
                      <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                        {formatCurrency(profile.lifestyleCost.requiredAnnualSalary)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        per year
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Matched Jobs
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {profile.matchedJobs?.length || 0} careers
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Detailed Comparison Table */}
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Detailed Comparison
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id} sx={{ fontWeight: 600 }}>
                        {profile.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Annual Salary */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Required Annual Salary</TableCell>
                    {profilesToCompare.map((profile, index) => (
                      <TableCell key={profile.id}>
                        <Typography
                          sx={{
                            fontWeight: index === lowestSalaryIndex ? 700 : 400,
                            color: index === lowestSalaryIndex ? 'success.main' : 'text.primary',
                          }}
                        >
                          {formatCurrency(profile.lifestyleCost.requiredAnnualSalary)}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Monthly Cost */}
                  <TableRow sx={{ bgcolor: alpha(theme.palette.grey[100], 0.5) }}>
                    <TableCell sx={{ fontWeight: 600 }}>Monthly Cost</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id}>
                        {formatCurrency(profile.lifestyleCost.monthlyCost)}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Matched Jobs */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Matched Jobs</TableCell>
                    {profilesToCompare.map((profile, index) => (
                      <TableCell key={profile.id}>
                        <Typography
                          sx={{
                            fontWeight: index === mostJobsIndex ? 700 : 400,
                            color: index === mostJobsIndex ? 'primary.main' : 'text.primary',
                          }}
                        >
                          {profile.matchedJobs?.length || 0}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Housing */}
                  <TableRow sx={{ bgcolor: alpha(theme.palette.grey[100], 0.5) }}>
                    <TableCell sx={{ fontWeight: 600 }}>Housing</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id}>
                        {profile.assessmentData.housing.bedrooms} bedroom,{' '}
                        {profile.assessmentData.housing.housingLocation}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Family Size */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Family Size</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id}>
                        {profile.assessmentData.lifestyle.familySize} people (
                        {profile.assessmentData.lifestyle.numChildren} children)
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Transportation */}
                  <TableRow sx={{ bgcolor: alpha(theme.palette.grey[100], 0.5) }}>
                    <TableCell sx={{ fontWeight: 600 }}>Transportation</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id}>
                        {profile.assessmentData.lifestyle.transportationType}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Savings Goal */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Savings Goal</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id}>
                        {profile.assessmentData.lifestyle.savingsGoal}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown Comparison */}
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Cost Breakdown by Category
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id} sx={{ fontWeight: 600 }}>
                        {profile.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(profilesToCompare[0].lifestyleCost.breakdown).map(
                    (category, index) => (
                      <TableRow
                        key={category}
                        sx={{
                          bgcolor: index % 2 === 0 ? 'transparent' : alpha(theme.palette.grey[100], 0.5),
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                          {category}
                        </TableCell>
                        {profilesToCompare.map((profile) => (
                          <TableCell key={profile.id}>
                            {formatCurrency(
                              profile.lifestyleCost.breakdown[
                                category as keyof typeof profile.lifestyleCost.breakdown
                              ]
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  )}
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                    <TableCell sx={{ fontWeight: 700 }}>Total Monthly</TableCell>
                    {profilesToCompare.map((profile) => (
                      <TableCell key={profile.id} sx={{ fontWeight: 700 }}>
                        {formatCurrency(profile.lifestyleCost.monthlyCost)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Button variant="contained" onClick={() => router.push('/careers')}>
            View All Careers
          </Button>
        </Stack>
      </Container>
    </PageContainer>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <PageContainer>
          <Container maxWidth="lg">
            <Typography>Loading comparison...</Typography>
          </Container>
        </PageContainer>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
