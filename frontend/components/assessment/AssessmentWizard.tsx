'use client';

import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/lib/store/profileStore';
import { HousingStep } from './HousingStep';
import { LifestyleStep } from './LifestyleStep';
import { CareerPreferencesStep } from './CareerPreferencesStep';
import { ReviewStep } from './ReviewStep';

const steps = [
  {
    label: 'Housing Preferences',
    description: 'Tell us about your ideal living situation',
  },
  {
    label: 'Lifestyle Needs',
    description: 'Define your lifestyle and family needs',
  },
  {
    label: 'Career Preferences',
    description: 'Share your career goals and preferences',
  },
  {
    label: 'Review & Calculate',
    description: 'Review your choices and see results',
  },
];

export const AssessmentWizard: React.FC = () => {
  const router = useRouter();
  const { currentStep, setCurrentStep, assessmentData } = useProfileStore();
  const [isValid, setIsValid] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsValid(false); // Reset validation for next step
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Navigate to careers page to show matched results
    router.push('/careers');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <HousingStep onValidationChange={setIsValid} />;
      case 1:
        return <LifestyleStep onValidationChange={setIsValid} />;
      case 2:
        return <CareerPreferencesStep onValidationChange={setIsValid} />;
      case 3:
        return <ReviewStep onValidationChange={setIsValid} onFinish={handleFinish} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #0277BD 0%, #01579B 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Lifestyle Assessment
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Let's map your dream lifestyle to career opportunities in the Cayman Islands
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  <Typography variant="caption">{step.description}</Typography>
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: '400px', mb: 3 }}>
          {renderStepContent(currentStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 0}
            sx={{ minWidth: 120 }}
          >
            Back
          </Button>

          {!isLastStep ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isValid}
              sx={{ minWidth: 120 }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleFinish}
              disabled={!isValid}
              sx={{
                minWidth: 120,
                background: 'linear-gradient(135deg, #0277BD 0%, #01579B 100%)',
              }}
            >
              View Careers
            </Button>
          )}
        </Box>
      </Paper>

      {/* Progress indicator */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Step {currentStep + 1} of {steps.length}
        </Typography>
      </Box>
    </Container>
  );
};
