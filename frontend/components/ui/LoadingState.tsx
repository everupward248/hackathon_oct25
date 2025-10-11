'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';

interface LoadingStateProps {
  variant?: 'card' | 'list' | 'table' | 'full';
  count?: number;
  text?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'card',
  count = 3,
  text = 'Loading...',
}) => {
  if (variant === 'full') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          {text}
        </Typography>
      </Box>
    );
  }

  if (variant === 'card') {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Stack spacing={2}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="80%" />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
                  <Skeleton variant="rectangular" height={80} />
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rectangular" width={100} height={36} />
                    <Skeleton variant="rectangular" width={80} height={36} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (variant === 'list') {
    return (
      <Stack spacing={2}>
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
                  <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width="40%" />
                </Box>
                <Skeleton variant="rectangular" width={100} height={36} />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  if (variant === 'table') {
    return (
      <Card elevation={2}>
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 2 }} width="40%" />
          <Stack spacing={1}>
            {Array.from({ length: count }).map((_, index) => (
              <Stack key={index} direction="row" spacing={2}>
                <Skeleton variant="rectangular" width="25%" height={40} />
                <Skeleton variant="rectangular" width="25%" height={40} />
                <Skeleton variant="rectangular" width="25%" height={40} />
                <Skeleton variant="rectangular" width="25%" height={40} />
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export const CareerCardSkeleton: React.FC = () => {
  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 3 }} />
          </Stack>

          {/* Title */}
          <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width="80%" />

          {/* Company */}
          <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width="60%" />

          {/* Salary */}
          <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />

          {/* Details */}
          <Stack spacing={1}>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="75%" />
            <Skeleton variant="text" width="85%" />
          </Stack>

          {/* Buttons */}
          <Stack direction="column" spacing={1}>
            <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 1 }} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const PathwayGraphSkeleton: React.FC = () => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 3 }} width="40%" />

        {/* Overview card */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width="40%" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width="40%" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width="40%" />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Pathway steps */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {[1, 2, 3].map((_, index) => (
            <Card key={index} variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: '50%' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width="70%" />
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                  <Stack spacing={0.5}>
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="85%" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 3 }} width="40%" />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={100} height={20} />
        </Stack>
      </CardContent>
    </Card>
  );
};
