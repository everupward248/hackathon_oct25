'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { SearchOff, Home } from '@mui/icons-material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={4}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <SearchOff
              sx={{
                fontSize: 80,
                color: 'text.secondary',
                mb: 3,
              }}
            />

            <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 700, fontSize: '4rem' }}>
              404
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Page Not Found
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              The page you're looking for doesn't exist or has been moved.
            </Typography>

            <Button
              component={Link}
              href="/"
              variant="contained"
              startIcon={<Home />}
              size="large"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
