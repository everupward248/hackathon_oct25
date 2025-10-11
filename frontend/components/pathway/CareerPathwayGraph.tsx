'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  School,
  WorkOutline,
  CheckCircle,
} from '@mui/icons-material';
import { CareerPathway, CareerStep } from '@/types/career';
import { formatCurrency } from '@/lib/constants';

interface CareerPathwayGraphProps {
  pathway: CareerPathway;
  currentStepIndex?: number;
}

export const CareerPathwayGraph: React.FC<CareerPathwayGraphProps> = ({
  pathway,
  currentStepIndex = -1,
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
            time_to_achieve: 'Current Position',
            cost_of_education: 0,
          } as CareerStep,
        ]
      : []),
    ...pathway.intermediate_steps,
  ];

  const renderPathwayNode = (step: CareerStep, index: number, isLast: boolean) => {
    const isCurrent = index === 0 && pathway.current_role;
    const isCompleted = index <= currentStepIndex;
    const isTarget = isLast;

    return (
      <Box key={`${step.role}-${index}`} sx={{ position: 'relative' }}>
        {/* Pathway Node Card */}
        <Card
          elevation={isTarget ? 8 : isCompleted ? 4 : 2}
          sx={{
            minWidth: { xs: 280, sm: 320 },
            maxWidth: { xs: 280, sm: 320 },
            position: 'relative',
            transition: 'all 0.3s ease-in-out',
            border: '2px solid',
            borderColor: isCurrent
              ? 'success.main'
              : isTarget
              ? 'primary.main'
              : isCompleted
              ? alpha(theme.palette.success.main, 0.5)
              : 'grey.300',
            background: isTarget
              ? `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.05
                )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
              : isCurrent
              ? alpha(theme.palette.success.light, 0.1)
              : 'background.paper',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 8,
            },
          }}
        >
          <CardContent>
            {/* Status Badge */}
            <Box sx={{ mb: 2 }}>
              {isCurrent && (
                <Chip
                  label="Current Position"
                  color="success"
                  size="small"
                  icon={<CheckCircle />}
                />
              )}
              {isTarget && (
                <Chip
                  label="Target Role"
                  color="primary"
                  size="small"
                  icon={<TrendingUp />}
                />
              )}
              {!isCurrent && !isTarget && (
                <Chip
                  label={`Step ${index}${pathway.current_role ? '' : ' (Starting Point)'}`}
                  variant="outlined"
                  size="small"
                  icon={<WorkOutline />}
                />
              )}
            </Box>

            {/* Role Title */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: isTarget ? 'primary.main' : 'text.primary',
              }}
            >
              {step.role}
            </Typography>

            {/* Salary Range */}
            {step.salary_range.min > 0 && (
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }}
              >
                <Typography variant="caption" color="text.secondary" display="block">
                  Salary Range
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

            {/* Time to Achieve */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Timeline
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {step.time_to_achieve}
              </Typography>
            </Box>

            {/* Required Education */}
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

            {/* Required Skills (first 5) */}
            {step.required_skills.length > 0 && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 0.5 }}
                >
                  Key Skills Needed
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.5}>
                  {step.required_skills.slice(0, 5).map((skill, i) => (
                    <Chip
                      key={i}
                      label={skill}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                  {step.required_skills.length > 5 && (
                    <Tooltip
                      title={step.required_skills.slice(5).join(', ')}
                      arrow
                    >
                      <Chip
                        label={`+${step.required_skills.length - 5} more`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Tooltip>
                  )}
                </Stack>
              </Box>
            )}

            {/* Education Cost */}
            {step.cost_of_education && step.cost_of_education > 0 && (
              <Box
                sx={{
                  mt: 2,
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
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                  {formatCurrency(step.cost_of_education)}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Connector Arrow (not for last step) */}
        {!isLast && (
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              height: 40,
              width: 2,
              bgcolor: isCompleted ? 'success.main' : 'grey.300',
              mx: 'auto',
              my: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `8px solid ${
                  isCompleted ? theme.palette.success.main : theme.palette.grey[300]
                }`,
              },
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <Box>
      {/* Pathway Overview */}
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
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Your Career Pathway
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
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
            <Box>
              <Typography variant="caption" color="text.secondary">
                Timeline
              </Typography>
              <Typography variant="h6" color="primary">
                {pathway.timeline}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Total Education Cost
              </Typography>
              <Typography variant="h6" color="warning.dark">
                {formatCurrency(pathway.total_cost_of_education)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Estimated Salary Growth
              </Typography>
              <Typography variant="h6" color="success.main">
                +{formatCurrency(pathway.estimated_salary_growth)}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Pathway Visualization */}
      <Box>
        {/* Mobile: Vertical Layout */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {allSteps.map((step, index) =>
            renderPathwayNode(step, index, index === allSteps.length - 1)
          )}
        </Box>

        {/* Desktop: Horizontal Layout */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: alpha(theme.palette.grey[300], 0.2),
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: theme.palette.primary.main,
              borderRadius: 4,
            },
          }}
        >
          {allSteps.map((step, index) => (
            <React.Fragment key={`fragment-${step.role}-${index}`}>
              {renderPathwayNode(step, index, index === allSteps.length - 1)}
              {index < allSteps.length - 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 60,
                    pt: 15,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      height: 2,
                      bgcolor: index <= currentStepIndex ? 'success.main' : 'grey.300',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: -6,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderLeft: `8px solid ${
                          index <= currentStepIndex
                            ? theme.palette.success.main
                            : theme.palette.grey[300]
                        }`,
                      },
                    }}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
