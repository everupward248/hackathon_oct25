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
  Chip,
} from '@mui/material';
import {
  Favorite,
  Work,
  TrendingUp,
  LocationOn,
  School,
  AttachMoney,
} from '@mui/icons-material';

export default function Home() {
  return (
    <Box component="main">
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 64px)' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(2, 119, 189, 0.05) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 111, 0, 0.05) 100%)',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: { xs: 200, md: 400 },
            height: { xs: 200, md: 400 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(2, 119, 189, 0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: { xs: 150, md: 300 },
            height: { xs: 150, md: 300 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 111, 0, 0.1) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Chip
              label="14,036 Real Jobs • Cayman Islands"
              color="primary"
              variant="outlined"
              sx={{
                mb: 3,
                fontWeight: 600,
                fontSize: '0.875rem',
                animation: 'fadeIn 1s ease-in',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(-10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            />

            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 700,
                fontFamily: 'Poppins',
                background: 'linear-gradient(135deg, #0277BD 0%, #01579B 60%, #FF6F00 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                lineHeight: 1.2,
                animation: 'fadeIn 1s ease-in 0.2s both',
              }}
            >
              Design Your Dream Lifestyle
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1.125rem', md: '1.375rem' },
                lineHeight: 1.6,
                animation: 'fadeIn 1s ease-in 0.4s both',
              }}
            >
              Map your ideal lifestyle in the Cayman Islands to career opportunities that can support it
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{
                mt: 5,
                animation: 'fadeIn 1s ease-in 0.6s both',
              }}
            >
              <Button
                component={Link}
                href="/assessment"
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.75,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0277BD 0%, #01579B 100%)',
                  boxShadow: '0 4px 14px rgba(2, 119, 189, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #01579B 0%, #0277BD 100%)',
                    boxShadow: '0 6px 20px rgba(2, 119, 189, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Start Assessment
              </Button>
              <Button
                component={Link}
                href="/careers"
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.75,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Browse Careers
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontFamily: 'Poppins',
              mb: 2,
            }}
          >
            How It Works
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            A unique approach to career planning that starts with your lifestyle goals
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <Favorite sx={{ fontSize: 56 }} />,
              title: 'Lifestyle-First Approach',
              description: 'Define how you want to live — housing, family, activities, and savings goals',
              color: 'error.main',
            },
            {
              icon: <AttachMoney sx={{ fontSize: 56 }} />,
              title: 'Real Cost Calculations',
              description: 'Get accurate monthly and annual cost estimates based on Cayman Islands data',
              color: 'success.main',
            },
            {
              icon: <Work sx={{ fontSize: 56 }} />,
              title: 'Smart Career Matching',
              description: 'See careers that can support your lifestyle with personalized match scores',
              color: 'primary.main',
            },
            {
              icon: <TrendingUp sx={{ fontSize: 56 }} />,
              title: 'Career Pathways',
              description: 'Visualize your path from current position to dream lifestyle',
              color: 'secondary.main',
            },
            {
              icon: <LocationOn sx={{ fontSize: 56 }} />,
              title: 'Local Opportunities',
              description: 'Explore 14,000+ real jobs across George Town, West Bay, and other locations',
              color: 'info.main',
            },
            {
              icon: <School sx={{ fontSize: 56 }} />,
              title: 'Skills Gap Analysis',
              description: 'Identify education and training needed to reach your career goals',
              color: 'warning.main',
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box
                    sx={{
                      color: feature.color,
                      mb: 2,
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: `${feature.color.replace('.main', '')}.light`,
                      bgcolor: 'action.hover',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600, fontFamily: 'Poppins', mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0277BD 0%, #01579B 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: 'Poppins',
                mb: 3,
              }}
            >
              Ready to Map Your Future?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, lineHeight: 1.6 }}>
              Take the 5-minute lifestyle assessment and discover careers matched to your goals
            </Typography>
            <Button
              component={Link}
              href="/assessment"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                bgcolor: 'white',
                color: 'primary.main',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  bgcolor: 'grey.100',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
