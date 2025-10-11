'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
  OutlinedInput,
  Slider,
} from '@mui/material';
import {
  School,
  Work,
  LocationOn,
  Category,
  BarChart,
} from '@mui/icons-material';
import { useProfileStore } from '@/lib/store/profileStore';
import { SelectChangeEvent } from '@mui/material/Select';

interface CareerPreferencesStepProps {
  onValidationChange: (isValid: boolean) => void;
}

const EDUCATION_LEVELS = [
  'High School Diploma',
  'Some College',
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  'Doctoral Degree',
  'Professional Certification',
];

const EXPERIENCE_LEVELS = [
  'No Experience',
  '0-1 Year',
  '1-2 Years',
  '2-3 Years',
  '3-5 Years',
  '5-7 Years',
  '7-10 Years',
  '10+ Years',
];

const LOCATIONS = [
  'George Town',
  'West Bay',
  'Bodden Town',
  'North Side',
  'East End',
  'Cayman Brac',
  'Little Cayman',
];

const INDUSTRIES = [
  'Financial Services',
  'Tourism & Hospitality',
  'Construction',
  'Healthcare',
  'Technology',
  'Education',
  'Real Estate',
  'Legal Services',
  'Retail',
  'Government',
];

export const CareerPreferencesStep: React.FC<CareerPreferencesStepProps> = ({
  onValidationChange,
}) => {
  const { assessmentData, updateCareerPreferences } = useProfileStore();

  const [currentEducationLevel, setCurrentEducationLevel] = useState(
    assessmentData.careerPreferences?.currentEducationLevel ?? "Bachelor's Degree"
  );
  const [yearsOfExperience, setYearsOfExperience] = useState(
    assessmentData.careerPreferences?.yearsOfExperience ?? '2-3 Years'
  );
  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    assessmentData.careerPreferences?.preferredLocations ?? ['George Town']
  );
  const [preferredIndustries, setPreferredIndustries] = useState<string[]>(
    assessmentData.careerPreferences?.preferredIndustries ?? []
  );
  const [salaryPriority, setSalaryPriority] = useState(
    assessmentData.careerPreferences?.priorities?.salary ?? 70
  );
  const [locationPriority, setLocationPriority] = useState(
    assessmentData.careerPreferences?.priorities?.location ?? 60
  );
  const [workLifeBalancePriority, setWorkLifeBalancePriority] = useState(
    assessmentData.careerPreferences?.priorities?.workLifeBalance ?? 50
  );

  // Update store and validate when values change
  useEffect(() => {
    updateCareerPreferences({
      currentEducationLevel,
      yearsOfExperience,
      preferredLocations,
      preferredIndustries,
      priorities: {
        salary: salaryPriority,
        location: locationPriority,
        workLifeBalance: workLifeBalancePriority,
      },
    });

    // Validate: must have at least education, experience, and one location
    const isValid =
      currentEducationLevel !== '' &&
      yearsOfExperience !== '' &&
      preferredLocations.length > 0;

    onValidationChange(isValid);
  }, [
    currentEducationLevel,
    yearsOfExperience,
    preferredLocations,
    preferredIndustries,
    salaryPriority,
    locationPriority,
    workLifeBalancePriority,
    updateCareerPreferences,
    onValidationChange,
  ]);

  const handleLocationChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setPreferredLocations(typeof value === 'string' ? value.split(',') : value);
  };

  const handleIndustryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setPreferredIndustries(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Career Preferences
      </Typography>

      <Grid container spacing={3}>
        {/* Education Level */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Education Level
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Current Education</InputLabel>
                <Select
                  value={currentEducationLevel}
                  label="Current Education"
                  onChange={(e) => setCurrentEducationLevel(e.target.value)}
                >
                  {EDUCATION_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Experience Level */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Work sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Work Experience
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Years of Experience</InputLabel>
                <Select
                  value={yearsOfExperience}
                  label="Years of Experience"
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferred Locations */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Preferred Work Locations
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Select Locations</InputLabel>
                <Select
                  multiple
                  value={preferredLocations}
                  onChange={handleLocationChange}
                  input={<OutlinedInput label="Select Locations" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {LOCATIONS.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Select one or more locations where you'd like to work
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferred Industries */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Category sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Preferred Industries
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel>Select Industries (Optional)</InputLabel>
                <Select
                  multiple
                  value={preferredIndustries}
                  onChange={handleIndustryChange}
                  input={<OutlinedInput label="Select Industries (Optional)" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" color="secondary" />
                      ))}
                    </Box>
                  )}
                >
                  {INDUSTRIES.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Leave empty to see all industries, or select specific ones to focus your search
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Priorities */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BarChart sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  What Matters Most to You?
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Salary Importance
                  </Typography>
                  <Slider
                    value={salaryPriority}
                    onChange={(_, value) => setSalaryPriority(value as number)}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    marks={[
                      { value: 0, label: 'Not Important' },
                      { value: 50, label: 'Moderate' },
                      { value: 100, label: 'Critical' },
                    ]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Location Importance
                  </Typography>
                  <Slider
                    value={locationPriority}
                    onChange={(_, value) => setLocationPriority(value as number)}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    marks={[
                      { value: 0, label: 'Flexible' },
                      { value: 50, label: 'Moderate' },
                      { value: 100, label: 'Essential' },
                    ]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Work-Life Balance
                  </Typography>
                  <Slider
                    value={workLifeBalancePriority}
                    onChange={(_, value) => setWorkLifeBalancePriority(value as number)}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    marks={[
                      { value: 0, label: 'Low Priority' },
                      { value: 50, label: 'Important' },
                      { value: 100, label: 'Essential' },
                    ]}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
