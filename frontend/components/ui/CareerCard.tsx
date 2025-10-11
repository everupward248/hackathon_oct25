'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Avatar,
  Stack,
} from '@mui/material';
import {
  LocationOnOutlined,
  WorkOutline,
  SchoolOutlined,
} from '@mui/icons-material';

interface CareerCardProps {
  id?: string;
  title: string;
  company: string;
  salaryMin?: number;
  salaryMax?: number;
  location: string;
  matchScore?: number;
  educationLevel?: string;
  industry?: string;
  companyLogo?: string;
  onViewDetails?: () => void;
  onViewPathway?: () => void;
  onSave?: () => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  id,
  title,
  company,
  salaryMin,
  salaryMax,
  location,
  matchScore,
  educationLevel,
  industry,
  companyLogo,
  onViewDetails,
  onViewPathway,
  onSave,
}) => {
  const formatSalary = (amount: number) => {
    return `CI$${amount.toLocaleString()}`;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'default';
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 4,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header with logo and match score */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Avatar
            src={companyLogo}
            alt={company}
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.light',
            }}
          >
            {company[0]}
          </Avatar>
          {matchScore !== undefined && (
            <Chip
              label={`${matchScore}% Match`}
              color={getMatchScoreColor(matchScore)}
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: '12px',
              }}
            />
          )}
        </Box>

        {/* Job title */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        {/* Company name */}
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {company}
        </Typography>

        {/* Salary */}
        {(salaryMin || salaryMax) && (
          <Box sx={{ mb: 2 }}>
            <Typography
              component="span"
              sx={{
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'success.main',
              }}
            >
              {salaryMin && salaryMax
                ? `${formatSalary(salaryMin)} - ${formatSalary(salaryMax)}`
                : salaryMin
                ? `${formatSalary(salaryMin)}+`
                : `Up to ${formatSalary(salaryMax!)}`}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              per year
            </Typography>
          </Box>
        )}

        {/* Details */}
        <Stack spacing={1}>
          {location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
          )}
          {educationLevel && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {educationLevel}
              </Typography>
            </Box>
          )}
          {industry && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WorkOutline sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {industry}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
          <Stack direction="row" spacing={1}>
            {onViewDetails && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onViewDetails}
              >
                View Details
              </Button>
            )}
            {onSave && (
              <Button variant="outlined" color="primary" onClick={onSave}>
                Save
              </Button>
            )}
          </Stack>
          {onViewPathway && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onViewPathway}
            >
              View Career Pathway
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
};
