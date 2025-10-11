'use client';

import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Button,
  Alert,
} from '@mui/material';
import {
  Home,
  People,
  Work,
  TrendingUp,
  CheckCircle,
} from '@mui/icons-material';
import { useProfileStore } from '@/lib/store/profileStore';
import { calculateLifestyleCost } from '@/lib/calculators/lifestyle';
import { matchJobsToProfile } from '@/lib/algorithms/matching';
import { SAMPLE_JOBS } from '@/lib/data/jobs';
import { formatCurrency } from '@/lib/constants';

interface ReviewStepProps {
  onValidationChange: (isValid: boolean) => void;
  onFinish: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  onValidationChange,
  onFinish,
}) => {
  const {
    assessmentData,
    setLifestyleCost,
    setLifestyleProfile,
    setMatchedJobs,
    saveProfile,
  } = useProfileStore();

  // Calculate lifestyle cost
  const lifestyleCostResult = useMemo(() => {
    if (!assessmentData.housing || !assessmentData.lifestyle) {
      return null;
    }

    return calculateLifestyleCost({
      bedrooms: assessmentData.housing.bedrooms,
      housingLocation: assessmentData.housing.housingLocation,
      familySize: assessmentData.lifestyle.familySize,
      numChildren: assessmentData.lifestyle.numChildren,
      childcareType: assessmentData.lifestyle.childcareType,
      transportationType: assessmentData.lifestyle.transportationType,
      groceryLevel: assessmentData.lifestyle.groceryLevel,
      diningFrequency: assessmentData.lifestyle.diningFrequency,
      entertainmentLevel: assessmentData.lifestyle.entertainmentLevel,
      hasGym: assessmentData.lifestyle.hasGym,
      savingsGoal: assessmentData.lifestyle.savingsGoal,
    });
  }, [assessmentData]);

  // Create lifestyle profile and match jobs
  const matchedJobs = useMemo(() => {
    if (!lifestyleCostResult || !assessmentData.careerPreferences) {
      return [];
    }

    const profile = {
      requiredAnnualSalary: lifestyleCostResult.requiredAnnualSalary,
      preferredLocations: assessmentData.careerPreferences.preferredLocations,
      currentEducationLevel: assessmentData.careerPreferences.currentEducationLevel,
      yearsOfExperience: assessmentData.careerPreferences.yearsOfExperience,
      preferredIndustries: assessmentData.careerPreferences.preferredIndustries,
      priorities: assessmentData.careerPreferences.priorities,
    };

    // Save profile to store
    setLifestyleProfile(profile);

    // Match jobs
    const matches = matchJobsToProfile(SAMPLE_JOBS, profile);
    return matches;
  }, [lifestyleCostResult, assessmentData, setLifestyleProfile]);

  // Update store with results
  useEffect(() => {
    if (lifestyleCostResult) {
      setLifestyleCost(lifestyleCostResult);
    }

    if (matchedJobs.length > 0) {
      setMatchedJobs(matchedJobs);
      onValidationChange(true);
    } else {
      onValidationChange(false);
    }
  }, [lifestyleCostResult, matchedJobs, setLifestyleCost, setMatchedJobs, onValidationChange]);

  if (!lifestyleCostResult || !assessmentData.housing || !assessmentData.lifestyle || !assessmentData.careerPreferences) {
    return (
      <Alert severity="error">
        Missing assessment data. Please complete all previous steps.
      </Alert>
    );
  }

  const topMatches = matchedJobs.slice(0, 5);
  const avgMatchScore = matchedJobs.length > 0
    ? matchedJobs.reduce((sum, job) => sum + job.matchScore, 0) / matchedJobs.length
    : 0;

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Review Your Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Lifestyle Cost Summary */}
        <Grid item xs={12}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(2, 119, 189, 0.1) 0%, rgba(1, 87, 155, 0.1) 100%)',
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Your Lifestyle Requires
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  {formatCurrency(Math.ceil(lifestyleCostResult.requiredAnnualSalary))}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  / year
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                Monthly: {formatCurrency(Math.ceil(lifestyleCostResult.requiredMonthlySalary))}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                {Object.entries(lifestyleCostResult.monthly).map(([key, value]) => {
                  if (key === 'total') return null;
                  return (
                    <Grid item xs={6} sm={4} md={3} key={key}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatCurrency(value)}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Home sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Housing
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {assessmentData.housing.bedrooms} Bedroom{assessmentData.housing.bedrooms > 1 ? 's' : ''}
              </Typography>
              <Chip
                label={assessmentData.housing.housingLocation === 'center' ? 'City Center' : 'Outside Center'}
                size="small"
                color="primary"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Lifestyle
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Family of {assessmentData.lifestyle.familySize}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {assessmentData.lifestyle.numChildren} {assessmentData.lifestyle.numChildren === 1 ? 'Child' : 'Children'}
              </Typography>
              <Chip
                label={`${assessmentData.lifestyle.groceryLevel} groceries`}
                size="small"
                color="secondary"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Work sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Career
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {assessmentData.careerPreferences.currentEducationLevel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {assessmentData.careerPreferences.yearsOfExperience} experience
              </Typography>
              <Chip
                label={`${assessmentData.careerPreferences.preferredLocations.length} location${assessmentData.careerPreferences.preferredLocations.length > 1 ? 's' : ''}`}
                size="small"
                color="primary"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Matching Results Preview */}
        <Grid item xs={12}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(255, 111, 0, 0.1) 0%, rgba(196, 62, 0, 0.1) 100%)',
              border: '1px solid',
              borderColor: 'secondary.light',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ mr: 1, color: 'success.main', fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {matchedJobs.length} Matching Careers Found!
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                Average match score: <strong>{avgMatchScore.toFixed(0)}%</strong>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Top 5 Matches:
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {topMatches.map((job, index) => (
                  <Box
                    key={job.id}
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {index + 1}. {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.company} • {job.location}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${job.matchScore}% match`}
                        color={job.matchScore >= 80 ? 'success' : job.matchScore >= 60 ? 'warning' : 'default'}
                        size="small"
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Profile Option */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Typography variant="body2">
                Click "View Careers" to see all matched opportunities and explore your career pathways
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => saveProfile(`Profile ${new Date().toLocaleDateString()}`)}
                sx={{ ml: 2, minWidth: 'auto', whiteSpace: 'nowrap' }}
              >
                Save Profile
              </Button>
            </Box>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};
