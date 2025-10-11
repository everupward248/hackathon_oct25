'use client';

import React from 'react';
import { Container, Box, SxProps, Theme } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disableGutters?: boolean;
  sx?: SxProps<Theme>;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  sx,
}) => {
  return (
    <Container
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={{
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 3 },
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};
