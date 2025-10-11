'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  LinearProgress,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  TrendingUp,
  School,
  Code,
  PsychologyOutlined,
  Business,
  Star,
} from '@mui/icons-material';
import { SkillsGap, SkillGapDetail, EducationRecommendation } from '@/types/career';
import { formatCurrency } from '@/lib/constants';

interface SkillsGapAnalysisProps {
  skillsGap: SkillsGap;
  showRecommendations?: boolean;
}

export const SkillsGapAnalysis: React.FC<SkillsGapAnalysisProps> = ({
  skillsGap,
  showRecommendations = true,
}) => {
  const theme = useTheme();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical':
        return <Code fontSize="small" />;
      case 'Soft':
        return <PsychologyOutlined fontSize="small" />;
      case 'Industry-Specific':
        return <Business fontSize="small" />;
      default:
        return <Star fontSize="small" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'primary';
      case 'Soft':
        return 'secondary';
      case 'Industry-Specific':
        return 'info';
      default:
        return 'default';
    }
  };

  const getGapSizeColor = (gapSize: number) => {
    if (gapSize <= 25) return 'success';
    if (gapSize <= 50) return 'info';
    if (gapSize <= 75) return 'warning';
    return 'error';
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
    }
  };

  // Group skills by category
  const skillsByCategory = skillsGap.missing_skills.reduce((acc, skill) => {
    // For basic implementation, categorize by common patterns
    // In real app, this would come from SkillGapDetail interface
    const category = skill.toLowerCase().includes('python') ||
      skill.toLowerCase().includes('java') ||
      skill.toLowerCase().includes('sql')
      ? 'Technical'
      : skill.toLowerCase().includes('communication') ||
        skill.toLowerCase().includes('leadership')
      ? 'Soft'
      : 'Industry-Specific';

    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Box>
      {/* Overview Card */}
      <Card
        elevation={3}
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Skills Gap Analysis
          </Typography>

          <Grid container spacing={3}>
            {/* Current Skills */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.success.main, 0.3),
                  height: '100%',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <CheckCircle color="success" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Current Skills
                  </Typography>
                </Stack>
                <Typography variant="h3" color="success.main" sx={{ fontWeight: 700 }}>
                  {skillsGap.current_skills.length}
                </Typography>
              </Box>
            </Grid>

            {/* Required Skills */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  height: '100%',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Star color="primary" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Required Skills
                  </Typography>
                </Stack>
                <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
                  {skillsGap.required_skills.length}
                </Typography>
              </Box>
            </Grid>

            {/* Skills Gap */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.warning.main, 0.3),
                  height: '100%',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <TrendingUp color="warning" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Skills to Develop
                  </Typography>
                </Stack>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.dark' }}>
                  {skillsGap.missing_skills.length}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Progress Bar */}
          <Box sx={{ mt: 3 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Skills Completion
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {Math.round(
                  (skillsGap.current_skills.length / skillsGap.required_skills.length) * 100
                )}
                %
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(skillsGap.current_skills.length / skillsGap.required_skills.length) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.grey[300], 0.3),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: 'success.main',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Missing Skills by Category */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Skills to Develop
          </Typography>

          <Stack spacing={2}>
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <Accordion key={category} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {getCategoryIcon(category)}
                    <Typography sx={{ fontWeight: 600 }}>{category}</Typography>
                    <Chip
                      label={skills.length}
                      size="small"
                      color={getCategoryColor(category) as any}
                    />
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        color={getCategoryColor(category) as any}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Current Skills */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Your Current Skills
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {skillsGap.current_skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="success"
                variant="outlined"
                size="small"
                icon={<CheckCircle />}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Education Recommendations */}
      {showRecommendations && skillsGap.education_recommendations.length > 0 && (
        <Card elevation={2}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <School color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recommended Education & Training
              </Typography>
            </Stack>

            <Stack spacing={2}>
              {skillsGap.education_recommendations
                .sort((a, b) => {
                  const priorityOrder = { high: 0, medium: 1, low: 2 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map((rec, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{
                      borderColor:
                        rec.priority === 'high'
                          ? 'error.main'
                          : rec.priority === 'medium'
                          ? 'warning.main'
                          : 'success.main',
                      borderWidth: rec.priority === 'high' ? 2 : 1,
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={2}
                        sx={{ mb: 2 }}
                      >
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {rec.name}
                            </Typography>
                            <Chip
                              label={rec.priority.toUpperCase()}
                              size="small"
                              color={getPriorityColor(rec.priority)}
                            />
                          </Stack>
                          <Chip label={rec.type} size="small" variant="outlined" />
                        </Box>
                      </Stack>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.warning.main, 0.05),
                            }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              Estimated Cost
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                              {formatCurrency(rec.estimated_cost)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              Time Required
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {rec.estimated_time}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
            </Stack>

            {/* Total Investment Summary */}
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.info.main, 0.05),
                border: '1px solid',
                borderColor: alpha(theme.palette.info.main, 0.3),
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Total Education Investment
              </Typography>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
                {formatCurrency(
                  skillsGap.education_recommendations.reduce(
                    (sum, rec) => sum + rec.estimated_cost,
                    0
                  )
                )}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Estimated total cost for all recommended education and training
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
