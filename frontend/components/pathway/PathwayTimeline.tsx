'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  useTheme,
  alpha,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  AccessTime,
  School,
  TrendingUp,
  AttachMoney,
} from '@mui/icons-material';
import { CareerPathway, CareerStep } from '@/types/career';
import { formatCurrency } from '@/lib/constants';

interface PathwayTimelineProps {
  pathway: CareerPathway;
  currentStepIndex?: number;
  variant?: 'stepper' | 'timeline';
}

export const PathwayTimeline: React.FC<PathwayTimelineProps> = ({
  pathway,
  currentStepIndex = -1,
  variant = 'timeline',
}) => {
  const theme = useTheme();

  const allSteps = [
    ...(pathway.current_role
      ? [
          {
            role: pathway.current_role,
            salary_range: { min: 0, max: 0 },
            required_education: [],
            required_skills: [],
            time_to_achieve: 'Starting Point',
            cost_of_education: 0,
          } as CareerStep,
        ]
      : []),
    ...pathway.intermediate_steps,
  ];

  if (variant === 'stepper') {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Step-by-Step Timeline
          </Typography>
          <Stepper activeStep={currentStepIndex + 1} orientation="vertical">
            {allSteps.map((step, index) => {
              const isCurrent = index === 0 && pathway.current_role;
              const avgSalary = step.salary_range.min > 0
                ? (step.salary_range.min + step.salary_range.max) / 2
                : 0;

              return (
                <Step key={`${step.role}-${index}`} completed={index <= currentStepIndex}>
                  <StepLabel
                    optional={
                      <Typography variant="caption" color="text.secondary">
                        {step.time_to_achieve}
                      </Typography>
                    }
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {step.role}
                      {isCurrent && (
                        <Chip
                          label="Current"
                          size="small"
                          color="success"
                          sx={{ ml: 1, height: 20 }}
                        />
                      )}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      {avgSalary > 0 && (
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <AttachMoney fontSize="small" color="primary" />
                          <Typography variant="body2">
                            {formatCurrency(step.salary_range.min)} -{' '}
                            {formatCurrency(step.salary_range.max)} / year
                          </Typography>
                        </Stack>
                      )}

                      {step.required_education.length > 0 && (
                        <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1 }}>
                          <School fontSize="small" color="action" sx={{ mt: 0.3 }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Required Education
                            </Typography>
                            {step.required_education.map((edu, i) => (
                              <Chip
                                key={i}
                                label={edu}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 0.5, mt: 0.5, fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        </Stack>
                      )}

                      {step.cost_of_education && step.cost_of_education > 0 && (
                        <Typography variant="body2" color="warning.dark" sx={{ mt: 1 }}>
                          Education Cost: {formatCurrency(step.cost_of_education)}
                        </Typography>
                      )}
                    </Box>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </CardContent>
      </Card>
    );
  }

  // Timeline variant (default)
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Career Progression Timeline
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* Vertical timeline line */}
          <Box
            sx={{
              position: 'absolute',
              left: 20,
              top: 20,
              bottom: 20,
              width: 2,
              bgcolor: 'divider',
              display: { xs: 'block', sm: 'block' },
            }}
          />

          {/* Timeline steps */}
          <Stack spacing={3}>
            {allSteps.map((step, index) => {
              const isCurrent = index === 0 && pathway.current_role;
              const isCompleted = index <= currentStepIndex;
              const isTarget = index === allSteps.length - 1;
              const avgSalary = step.salary_range.min > 0
                ? (step.salary_range.min + step.salary_range.max) / 2
                : 0;

              return (
                <Box key={`${step.role}-${index}`} sx={{ position: 'relative', pl: 6 }}>
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 11,
                      top: 4,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: isCurrent
                        ? 'success.main'
                        : isTarget
                        ? 'primary.main'
                        : isCompleted
                        ? 'success.light'
                        : 'grey.300',
                      border: '3px solid',
                      borderColor: 'background.paper',
                      boxShadow: 2,
                      zIndex: 1,
                    }}
                  />

                  {/* Timeline content */}
                  <Card
                    variant="outlined"
                    sx={{
                      transition: 'all 0.3s ease-in-out',
                      borderColor: isCurrent
                        ? 'success.main'
                        : isTarget
                        ? 'primary.main'
                        : 'divider',
                      borderWidth: isCurrent || isTarget ? 2 : 1,
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <CardContent>
                      {/* Role and badges */}
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                          {step.role}
                        </Typography>
                        {isCurrent && (
                          <Chip label="Current" size="small" color="success" />
                        )}
                        {isTarget && (
                          <Chip label="Target" size="small" color="primary" />
                        )}
                      </Stack>

                      {/* Timeline */}
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {step.time_to_achieve}
                        </Typography>
                      </Stack>

                      {/* Salary range */}
                      {avgSalary > 0 && (
                        <Box
                          sx={{
                            mb: 2,
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" display="block">
                            Expected Salary
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, color: 'primary.main' }}
                          >
                            {formatCurrency(step.salary_range.min)} -{' '}
                            {formatCurrency(step.salary_range.max)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            per year
                          </Typography>
                        </Box>
                      )}

                      {/* Education requirements */}
                      {step.required_education.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.5 }}>
                            <School fontSize="small" color="action" />
                            <Typography variant="caption" color="text.secondary">
                              Required Education
                            </Typography>
                          </Stack>
                          <Stack direction="row" flexWrap="wrap" gap={0.5}>
                            {step.required_education.map((edu, i) => (
                              <Chip
                                key={i}
                                label={edu}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {/* Skills needed (first 6) */}
                      {step.required_skills.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            sx={{ mb: 0.5 }}
                          >
                            Key Skills
                          </Typography>
                          <Stack direction="row" flexWrap="wrap" gap={0.5}>
                            {step.required_skills.slice(0, 6).map((skill, i) => (
                              <Chip
                                key={i}
                                label={skill}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            ))}
                            {step.required_skills.length > 6 && (
                              <Chip
                                label={`+${step.required_skills.length - 6}`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            )}
                          </Stack>
                        </Box>
                      )}

                      {/* Education cost */}
                      {step.cost_of_education && step.cost_of_education > 0 && (
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: alpha(theme.palette.warning.main, 0.1),
                            border: '1px solid',
                            borderColor: alpha(theme.palette.warning.main, 0.3),
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Education Investment
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: 'warning.dark' }}
                          >
                            {formatCurrency(step.cost_of_education)}
                          </Typography>
                        </Box>
                      )}

                      {/* Salary growth indicator */}
                      {index > 0 && avgSalary > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingUp fontSize="small" color="success" />
                          <Typography variant="caption" color="success.main">
                            Career progression step {index}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Summary footer */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            divider={
              <Box
                sx={{
                  width: { xs: '100%', sm: 1 },
                  height: { xs: 1, sm: 'auto' },
                  bgcolor: 'divider',
                }}
              />
            }
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Total Timeline
              </Typography>
              <Typography variant="h6" color="primary">
                {pathway.timeline}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Education Investment
              </Typography>
              <Typography variant="h6" color="warning.dark">
                {formatCurrency(pathway.total_cost_of_education)}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Salary Growth
              </Typography>
              <Typography variant="h6" color="success.main">
                +{formatCurrency(pathway.estimated_salary_growth)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
