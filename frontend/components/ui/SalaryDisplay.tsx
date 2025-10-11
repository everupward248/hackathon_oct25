'use client';

import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';

interface SalaryDisplayProps {
  amount: number;
  period?: 'month' | 'year';
  size?: 'small' | 'medium' | 'large';
  showPeriod?: boolean;
  sx?: SxProps<Theme>;
}

export const SalaryDisplay: React.FC<SalaryDisplayProps> = ({
  amount,
  period = 'year',
  size = 'medium',
  showPeriod = true,
  sx,
}) => {
  const formatAmount = (amount: number) => {
    return `CI$${amount.toLocaleString()}`;
  };

  const getFontSize = (size: string) => {
    switch (size) {
      case 'small':
        return '1rem';
      case 'large':
        return '2rem';
      default:
        return '1.5rem';
    }
  };

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 1, ...sx }}>
      <Typography
        component="span"
        sx={{
          fontFamily: 'Roboto Mono, monospace',
          fontSize: getFontSize(size),
          fontWeight: 600,
          color: 'success.main',
        }}
      >
        {formatAmount(amount)}
      </Typography>
      {showPeriod && (
        <Typography
          component="span"
          variant="caption"
          color="text.secondary"
        >
          per {period}
        </Typography>
      )}
    </Box>
  );
};
