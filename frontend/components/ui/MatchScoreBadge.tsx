'use client';

import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface MatchScoreBadgeProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
}

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score,
  size = 'medium',
  sx,
}) => {
  const getColors = (score: number) => {
    if (score >= 80) {
      return {
        bgcolor: 'success.light',
        color: 'success.dark',
      };
    }
    if (score >= 60) {
      return {
        bgcolor: 'warning.light',
        color: 'warning.dark',
      };
    }
    return {
      bgcolor: 'grey.200',
      color: 'grey.700',
    };
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { px: 1.5, py: 0.25, fontSize: '0.75rem' };
      case 'large':
        return { px: 3, py: 1, fontSize: '1.125rem' };
      default:
        return { px: 2, py: 0.5, fontSize: '0.875rem' };
    }
  };

  const colors = getColors(score);
  const sizeStyles = getSizeStyles(size);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        bgcolor: colors.bgcolor,
        color: colors.color,
        borderRadius: '12px',
        fontWeight: 600,
        ...sizeStyles,
        ...sx,
      }}
    >
      {score}% Match
    </Box>
  );
};
