'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Person,
  CheckCircle,
  PlayArrow,
  TrendingUp,
} from '@mui/icons-material';
import { PageContainer } from '@/components/ui';
import { DEMO_SCENARIOS } from '@/lib/data/demoScenarios';
import { useProfileStore } from '@/lib/store/profileStore';
import { calculateLifestyleCost } from '@/lib/calculators/lifestyle';

export default function ExamplesPage() {
  const router = useRouter();
  const theme = useTheme();
  const { updateHousingData, updateLifestyleData, updateCareerPreferences, setCurrentStep } =
    useProfileStore();

  const handleLoadScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    // Load assessment data into store
    updateHousingData(scenario.assessmentData.housing);

    // Calculate lifestyle cost
    const lifestyleCost = calculateLifestyleCost({
      ...scenario.assessmentData.housing,
      ...scenario.assessmentData.lifestyle,
    });

    updateLifestyleData({
      ...scenario.assessmentData.lifestyle,
      monthlyCost: lifestyleCost.monthlyCost,
    });

    updateCareerPreferences(scenario.assessmentData.careerPreferences);

    // Navigate to review step
    setCurrentStep(3);
    router.push('/assessment');
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
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
            Example Scenarios
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore pre-configured lifestyle scenarios to see how the platform works
          </Typography>
        </Box>

        {/* Introduction Card */}
        <Card
          elevation={2}
          sx={{
            mb: 4,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              How to Use These Examples
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              These example scenarios represent common situations faced by people in the Cayman
              Islands. Click "Try This Scenario" to automatically load the profile into the
              assessment tool and see personalized career matches.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Each scenario includes detailed persona information, lifestyle preferences, and career
              goals to help you understand different approaches to career planning.
            </Typography>
          </CardContent>
        </Card>

        {/* Scenario Cards */}
        <Grid container spacing={3}>
          {DEMO_SCENARIOS.map((scenario) => {
            const lifestyleCost = calculateLifestyleCost({
              ...scenario.assessmentData.housing,
              ...scenario.assessmentData.lifestyle,
            });

            return (
              <Grid item xs={12} md={6} key={scenario.id}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Header */}
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Person sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {scenario.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {scenario.persona.name}, Age {scenario.persona.age}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Description */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {scenario.description}
                    </Typography>

                    {/* Current Situation */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Current Situation
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {scenario.persona.currentSituation}
                      </Typography>
                    </Box>

                    {/* Goals */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Goals
                      </Typography>
                      <List dense disablePadding>
                        {scenario.persona.goals.map((goal, index) => (
                          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle fontSize="small" color="success" />
                            </ListItemIcon>
                            <ListItemText
                              primary={goal}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Profile Highlights */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Required Salary
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          CI${lifestyleCost.requiredAnnualSalary.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Housing
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {scenario.assessmentData.housing.bedrooms} bedroom
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Family Size
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {scenario.assessmentData.lifestyle.familySize} people
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Experience
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {scenario.assessmentData.careerPreferences.yearsOfExperience}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Industries */}
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                        Preferred Industries
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={0.5}>
                        {scenario.assessmentData.careerPreferences.preferredIndustries
                          .slice(0, 3)
                          .map((industry, index) => (
                            <Chip key={index} label={industry} size="small" variant="outlined" />
                          ))}
                        {scenario.assessmentData.careerPreferences.preferredIndustries.length >
                          3 && (
                          <Chip
                            label={`+${
                              scenario.assessmentData.careerPreferences.preferredIndustries
                                .length - 3
                            }`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PlayArrow />}
                      onClick={() => handleLoadScenario(scenario.id)}
                    >
                      Try This Scenario
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* CTA Section */}
        <Card
          elevation={3}
          sx={{
            mt: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
          }}
        >
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <TrendingUp sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Ready to Create Your Own Profile?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Take the full assessment to get personalized career recommendations based on your
              unique lifestyle goals and preferences.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/assessment')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Start Your Assessment
            </Button>
          </CardContent>
        </Card>
      </Container>
    </PageContainer>
  );
}
