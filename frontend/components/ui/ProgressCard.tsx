'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';

interface ProgressCardProps {
  title: string;
  progress: number;
  description?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  description,
  color = 'primary',
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={color}
          sx={{
            height: 10,
            borderRadius: '5px',
            mb: 1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {description || `${progress}% Complete`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: `${color}.main`,
            }}
          >
            {progress}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
