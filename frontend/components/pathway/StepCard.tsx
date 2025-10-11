'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Circle,
  School,
  AttachMoney,
  AccessTime,
  TrendingUp,
  Work,
} from '@mui/icons-material';
import { CareerStep } from '@/types/career';
import { formatCurrency } from '@/lib/constants';

interface StepCardProps {
  step: CareerStep;
  stepNumber: number;
  isCurrent?: boolean;
  isCompleted?: boolean;
  isTarget?: boolean;
  showProgress?: boolean;
  completionPercentage?: number;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  stepNumber,
  isCurrent = false,
  isCompleted = false,
  isTarget = false,
  showProgress = false,
  completionPercentage = 0,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const avgSalary = step.salary_range.min > 0
    ? (step.salary_range.min + step.salary_range.max) / 2
    : 0;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      elevation={isTarget ? 6 : isCurrent ? 4 : 2}
      sx={{
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        border: '2px solid',
        borderColor: isCurrent
          ? 'success.main'
          : isTarget
          ? 'primary.main'
          : isCompleted
          ? alpha(theme.palette.success.main, 0.5)
          : 'divider',
        background: isTarget
          ? `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
          : isCurrent
          ? alpha(theme.palette.success.light, 0.1)
          : 'background.paper',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Progress indicator */}
      {showProgress && (
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: alpha(theme.palette.grey[300], 0.2),
            '& .MuiLinearProgress-bar': {
              bgcolor: 'success.main',
            },
          }}
        />
      )}

      <CardContent>
        {/* Header with step number and status */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isCurrent
                  ? 'success.main'
                  : isTarget
                  ? 'primary.main'
                  : isCompleted
                  ? 'success.light'
                  : 'grey.300',
                color: 'white',
                fontWeight: 700,
              }}
            >
              {isCompleted ? <CheckCircle /> : stepNumber}
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {isCurrent ? 'Current Position' : isTarget ? 'Target Role' : `Step ${stepNumber}`}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {step.role}
              </Typography>
            </Box>
          </Stack>

          {(isCurrent || isTarget) && (
            <Chip
              label={isCurrent ? 'Current' : 'Goal'}
              color={isCurrent ? 'success' : 'primary'}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Stack>

        {/* Timeline */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <AccessTime fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {step.time_to_achieve}
          </Typography>
        </Stack>

        {/* Key metrics */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          {/* Salary */}
          {avgSalary > 0 && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.2),
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <AttachMoney fontSize="small" color="primary" />
                <Typography variant="caption" color="text.secondary">
                  Salary Range
                </Typography>
              </Stack>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                {formatCurrency(step.salary_range.min)} - {formatCurrency(step.salary_range.max)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                per year
              </Typography>
            </Box>
          )}

          {/* Education cost */}
          {step.cost_of_education && step.cost_of_education > 0 && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.warning.main, 0.05),
                border: '1px solid',
                borderColor: alpha(theme.palette.warning.main, 0.2),
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <School fontSize="small" sx={{ color: 'warning.dark' }} />
                <Typography variant="caption" color="text.secondary">
                  Education Investment
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                {formatCurrency(step.cost_of_education)}
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Required education (compact view) */}
        {step.required_education.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              Required Education
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              {step.required_education.slice(0, 2).map((edu, i) => (
                <Chip
                  key={i}
                  label={edu}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
              {step.required_education.length > 2 && (
                <Chip
                  label={`+${step.required_education.length - 2} more`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Stack>
          </Box>
        )}

        {/* Key skills (compact view) */}
        {step.required_skills.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              Key Skills ({step.required_skills.length})
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              {step.required_skills.slice(0, 3).map((skill, i) => (
                <Chip
                  key={i}
                  label={skill}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
              {step.required_skills.length > 3 && (
                <Chip
                  label={`+${step.required_skills.length - 3}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Stack>
          </Box>
        )}

        {/* Expand button for full details */}
        {(step.required_skills.length > 3 || step.required_education.length > 2) && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Stack direction="row" justifyContent="center">
              <IconButton
                onClick={handleExpandClick}
                sx={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
                size="small"
              >
                <ExpandMore />
              </IconButton>
            </Stack>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Divider sx={{ mb: 2 }} />

              {/* Full education list */}
              {step.required_education.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    All Required Education
                  </Typography>
                  <List dense>
                    {step.required_education.map((edu, i) => (
                      <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <School fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={edu}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Full skills list */}
              {step.required_skills.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    All Required Skills
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {step.required_skills.map((skill, i) => (
                      <Chip
                        key={i}
                        label={skill}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Collapse>
          </>
        )}

        {/* Progress indicator (if showing) */}
        {showProgress && completionPercentage > 0 && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                {completionPercentage}% Complete
              </Typography>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
