'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { Error as ErrorIcon, Refresh, Home } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

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
            <ErrorIcon
              sx={{
                fontSize: 80,
                color: 'error.main',
                mb: 3,
              }}
            />

            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Something Went Wrong
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We're sorry, but something unexpected happened. Don't worry, your data is safe.
            </Typography>

            {process.env.NODE_ENV === 'development' && (
              <Card
                variant="outlined"
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: 'grey.50',
                  textAlign: 'left',
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                <Typography
                  variant="caption"
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {error.message}
                </Typography>
              </Card>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={reset}
                size="large"
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={() => router.push('/')}
                size="large"
              >
                Go Home
              </Button>
            </Stack>

            {error.digest && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
                Error ID: {error.digest}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
