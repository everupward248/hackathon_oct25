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
  Select,
  MenuItem,
  InputLabel,
  Switch,
  Chip,
} from '@mui/material';
import {
  People,
  ChildCare,
  DirectionsCar,
  Restaurant,
  SportsBasketball,
  ShoppingCart,
  FitnessCenter,
  Savings,
} from '@mui/icons-material';
import { useProfileStore } from '@/lib/store/profileStore';

interface LifestyleStepProps {
  onValidationChange: (isValid: boolean) => void;
}

export const LifestyleStep: React.FC<LifestyleStepProps> = ({ onValidationChange }) => {
  const { assessmentData, updateLifestyleData } = useProfileStore();

  const [familySize, setFamilySize] = useState(
    assessmentData.lifestyle?.familySize ?? 1
  );
  const [numChildren, setNumChildren] = useState(
    assessmentData.lifestyle?.numChildren ?? 0
  );
  const [childcareType, setChildcareType] = useState<'daycare' | 'preschool' | 'afterschool' | 'none'>(
    assessmentData.lifestyle?.childcareType ?? 'none'
  );
  const [transportationType, setTransportationType] = useState<'car' | 'public' | 'both'>(
    assessmentData.lifestyle?.transportationType ?? 'car'
  );
  const [groceryLevel, setGroceryLevel] = useState<'basic' | 'moderate' | 'premium'>(
    assessmentData.lifestyle?.groceryLevel ?? 'moderate'
  );
  const [diningFrequency, setDiningFrequency] = useState<'occasional' | 'regular' | 'frequent'>(
    assessmentData.lifestyle?.diningFrequency ?? 'occasional'
  );
  const [entertainmentLevel, setEntertainmentLevel] = useState<'minimal' | 'moderate' | 'active'>(
    assessmentData.lifestyle?.entertainmentLevel ?? 'moderate'
  );
  const [hasGym, setHasGym] = useState(assessmentData.lifestyle?.hasGym ?? false);
  const [savingsGoal, setSavingsGoal] = useState<'minimal' | 'moderate' | 'aggressive'>(
    assessmentData.lifestyle?.savingsGoal ?? 'moderate'
  );

  // Update store and validate when values change
  useEffect(() => {
    updateLifestyleData({
      familySize,
      numChildren,
      childcareType: numChildren > 0 ? childcareType : 'none',
      transportationType,
      groceryLevel,
      diningFrequency,
      entertainmentLevel,
      hasGym,
      savingsGoal,
    });

    // Always valid since we have default values
    onValidationChange(true);
  }, [
    familySize,
    numChildren,
    childcareType,
    transportationType,
    groceryLevel,
    diningFrequency,
    entertainmentLevel,
    hasGym,
    savingsGoal,
    updateLifestyleData,
    onValidationChange,
  ]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Lifestyle Needs
      </Typography>

      <Grid container spacing={3}>
        {/* Family Size */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Family Size
                </Typography>
              </Box>

              <Slider
                value={familySize}
                onChange={(_, value) => setFamilySize(value as number)}
                min={1}
                max={6}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{ mt: 3, mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Total people in household: <strong>{familySize}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Children */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChildCare sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Number of Children
                </Typography>
              </Box>

              <Slider
                value={numChildren}
                onChange={(_, value) => setNumChildren(value as number)}
                min={0}
                max={4}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{ mt: 3, mb: 2 }}
              />

              {numChildren > 0 && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Childcare Needs</InputLabel>
                  <Select
                    value={childcareType}
                    label="Childcare Needs"
                    onChange={(e) => setChildcareType(e.target.value as any)}
                  >
                    <MenuItem value="daycare">Full-time Daycare</MenuItem>
                    <MenuItem value="preschool">Preschool</MenuItem>
                    <MenuItem value="afterschool">After-school Care</MenuItem>
                    <MenuItem value="none">No Childcare Needed</MenuItem>
                  </Select>
                </FormControl>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Transportation */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DirectionsCar sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Transportation
                </Typography>
              </Box>

              <RadioGroup
                value={transportationType}
                onChange={(e) => setTransportationType(e.target.value as any)}
                row
              >
                <FormControlLabel value="car" control={<Radio />} label="Personal Car" />
                <FormControlLabel value="public" control={<Radio />} label="Public Transport" />
                <FormControlLabel value="both" control={<Radio />} label="Both" />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Food Preferences */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCart sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Grocery Budget
                </Typography>
              </Box>

              <RadioGroup
                value={groceryLevel}
                onChange={(e) => setGroceryLevel(e.target.value as any)}
              >
                <FormControlLabel
                  value="basic"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Basic</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Essential groceries only
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="moderate"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Moderate</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Mix of basics and quality items
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="premium"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Premium</Typography>
                      <Typography variant="caption" color="text.secondary">
                        High-quality and specialty items
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Dining Out */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Restaurant sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Dining Out
                </Typography>
              </Box>

              <RadioGroup
                value={diningFrequency}
                onChange={(e) => setDiningFrequency(e.target.value as any)}
              >
                <FormControlLabel
                  value="occasional"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Occasional</Typography>
                      <Typography variant="caption" color="text.secondary">
                        1-2 times per month
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="regular"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Regular</Typography>
                      <Typography variant="caption" color="text.secondary">
                        1-2 times per week
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="frequent"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Frequent</Typography>
                      <Typography variant="caption" color="text.secondary">
                        3+ times per week
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Entertainment & Activities */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SportsBasketball sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Entertainment Level
                </Typography>
              </Box>

              <RadioGroup
                value={entertainmentLevel}
                onChange={(e) => setEntertainmentLevel(e.target.value as any)}
              >
                <FormControlLabel value="minimal" control={<Radio />} label="Minimal (CI$50-100/month)" />
                <FormControlLabel value="moderate" control={<Radio />} label="Moderate (CI$150-300/month)" />
                <FormControlLabel value="active" control={<Radio />} label="Active (CI$400+/month)" />
              </RadioGroup>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <FitnessCenter sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="body2">Gym Membership</Typography>
                <Switch
                  checked={hasGym}
                  onChange={(e) => setHasGym(e.target.checked)}
                  sx={{ ml: 'auto' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Savings Goal */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Savings sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Savings Goal
                </Typography>
              </Box>

              <RadioGroup
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(e.target.value as any)}
              >
                <FormControlLabel
                  value="minimal"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Minimal</Typography>
                      <Typography variant="caption" color="text.secondary">
                        5% of income
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="moderate"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Moderate</Typography>
                      <Typography variant="caption" color="text.secondary">
                        10-15% of income
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="aggressive"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>Aggressive</Typography>
                      <Typography variant="caption" color="text.secondary">
                        20%+ of income
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
