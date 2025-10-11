'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { Home, Apartment, LocationCity, LocationOn } from '@mui/icons-material';
import { useProfileStore } from '@/lib/store/profileStore';
import { HOUSING_COSTS, formatCurrency } from '@/lib/constants';

interface HousingStepProps {
  onValidationChange: (isValid: boolean) => void;
}

export const HousingStep: React.FC<HousingStepProps> = ({ onValidationChange }) => {
  const { assessmentData, updateHousingData } = useProfileStore();

  const [bedrooms, setBedrooms] = useState(
    assessmentData.housing?.bedrooms ?? 1
  );
  const [housingLocation, setHousingLocation] = useState<'center' | 'outside'>(
    assessmentData.housing?.housingLocation ?? 'center'
  );

  // Calculate estimated housing cost
  const getHousingCost = () => {
    if (bedrooms === 1) {
      return housingLocation === 'center'
        ? HOUSING_COSTS['1bed_center']
        : HOUSING_COSTS['1bed_outside'];
    } else if (bedrooms === 2) {
      return housingLocation === 'center'
        ? HOUSING_COSTS['2bed_center']
        : HOUSING_COSTS['2bed_outside'];
    } else {
      return housingLocation === 'center'
        ? HOUSING_COSTS['3bed_center']
        : HOUSING_COSTS['3bed_outside'];
    }
  };

  const housingCost = getHousingCost();

  // Update store and validate when values change
  useEffect(() => {
    updateHousingData({
      bedrooms,
      housingLocation,
    });

    // Always valid since we have default values
    onValidationChange(true);
  }, [bedrooms, housingLocation, updateHousingData, onValidationChange]);

  const bedroomMarks = [
    { value: 1, label: '1 BR' },
    { value: 2, label: '2 BR' },
    { value: 3, label: '3 BR' },
    { value: 4, label: '4+ BR' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Housing Preferences
      </Typography>

      <Grid container spacing={3}>
        {/* Bedrooms Selection */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Home sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Number of Bedrooms
                </Typography>
              </Box>

              <Slider
                value={bedrooms}
                onChange={(_, value) => setBedrooms(value as number)}
                min={1}
                max={4}
                step={1}
                marks={bedroomMarks}
                valueLabelDisplay="auto"
                sx={{ mt: 4, mb: 2 }}
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Selected: <strong>{bedrooms === 4 ? '4+' : bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Location Selection */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Preferred Location
                </Typography>
              </Box>

              <FormControl component="fieldset">
                <RadioGroup
                  value={housingLocation}
                  onChange={(e) => setHousingLocation(e.target.value as 'center' | 'outside')}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card
                      variant="outlined"
                      sx={{
                        cursor: 'pointer',
                        border: housingLocation === 'center' ? 2 : 1,
                        borderColor: housingLocation === 'center' ? 'primary.main' : 'divider',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 2,
                        },
                      }}
                      onClick={() => setHousingLocation('center')}
                    >
                      <CardContent>
                        <FormControlLabel
                          value="center"
                          control={<Radio />}
                          label={
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationCity sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  City Center (George Town)
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                Close to work, shopping, and entertainment. Higher cost but maximum convenience.
                              </Typography>
                              <Chip
                                label="Most job opportunities"
                                size="small"
                                color="primary"
                                sx={{ mt: 1 }}
                              />
                            </Box>
                          }
                          sx={{ m: 0, width: '100%' }}
                        />
                      </CardContent>
                    </Card>

                    <Card
                      variant="outlined"
                      sx={{
                        cursor: 'pointer',
                        border: housingLocation === 'outside' ? 2 : 1,
                        borderColor: housingLocation === 'outside' ? 'primary.main' : 'divider',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 2,
                        },
                      }}
                      onClick={() => setHousingLocation('outside')}
                    >
                      <CardContent>
                        <FormControlLabel
                          value="outside"
                          control={<Radio />}
                          label={
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Apartment sx={{ mr: 1, color: 'secondary.main' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  Outside Center
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                More affordable living. Quieter neighborhoods with good access to amenities.
                              </Typography>
                              <Chip
                                label="More affordable"
                                size="small"
                                color="secondary"
                                sx={{ mt: 1 }}
                              />
                            </Box>
                          }
                          sx={{ m: 0, width: '100%' }}
                        />
                      </CardContent>
                    </Card>
                  </Box>
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Cost Estimate */}
        <Grid item xs={12}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(2, 119, 189, 0.05) 0%, rgba(1, 87, 155, 0.05) 100%)',
              border: '1px solid',
              borderColor: 'primary.light',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Estimated Housing Cost
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                  {formatCurrency(housingCost.avg)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  / month
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Range: {formatCurrency(housingCost.min)} - {formatCurrency(housingCost.max)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
