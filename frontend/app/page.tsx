'use client';

import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  FavoriteBorder,
  WorkOutline,
  TrendingUp,
} from '@mui/icons-material';

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #E3F2FD, #FFFFFF)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Cayman Career Mapper
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '1.125rem', md: '1.25rem' },
            }}
          >
            Design your dream lifestyle in the Cayman Islands, and we'll show you the career paths to make it happen
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              component={Link}
              href="/assessment"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Start Assessment
            </Button>
            <Button
              component={Link}
              href="/careers"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Browse Careers
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <FavoriteBorder
                  sx={{
                    fontSize: 48,
                    color: 'primary.main',
                    mb: 2,
                  }}
                />
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Lifestyle-First
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Start with how you want to live, not just what job you want
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <WorkOutline
                  sx={{
                    fontSize: 48,
                    color: 'primary.main',
                    mb: 2,
                  }}
                />
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  14,000+ Jobs
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Real Cayman Islands job data with salary ranges
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <TrendingUp
                  sx={{
                    fontSize: 48,
                    color: 'primary.main',
                    mb: 2,
                  }}
                />
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Career Pathways
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  See exactly how to achieve your lifestyle goals
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
