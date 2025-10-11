'use client';

import { useState, useMemo } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Button,
  Alert,
  AlertTitle,
  Divider,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  FilterList,
  Sort,
  TrendingUp,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { PageContainer, CareerCard } from '@/components/ui';
import { useProfileStore } from '@/lib/store/profileStore';
import { filterJobs, sortJobs } from '@/lib/algorithms/matching';
import { SAMPLE_JOBS } from '@/lib/data/jobs';
import { matchJobsToProfile } from '@/lib/algorithms/matching';
import { formatCurrency } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function CareersPage() {
  const router = useRouter();
  const { matchedJobs, lifestyleCost, lifestyleProfile } = useProfileStore();

  // Filter and sort state
  const [showFilters, setShowFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 250000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [sortBy, setSortBy] = useState<string>('matchScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Use matched jobs from store if available, otherwise show all jobs
  const baseJobs = matchedJobs.length > 0 ? matchedJobs : useMemo(() => {
    // If no profile, show all jobs unscored
    if (!lifestyleProfile) {
      return SAMPLE_JOBS.map(job => ({
        ...job,
        matchScore: 0,
        salaryFit: 0,
        locationFit: 0,
        educationFit: 0,
      }));
    }
    // Otherwise match them
    return matchJobsToProfile(SAMPLE_JOBS, lifestyleProfile);
  }, [lifestyleProfile]);

  // Get unique values for filters
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(baseJobs.map(job => job.location))];
    return uniqueLocations.sort();
  }, [baseJobs]);

  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(baseJobs.map(job => job.industry))];
    return uniqueIndustries.sort();
  }, [baseJobs]);

  // Apply filters and sorting
  const displayedJobs = useMemo(() => {
    let filtered = filterJobs(baseJobs, {
      salaryMin: salaryRange[0],
      salaryMax: salaryRange[1],
      locations: selectedLocations.length > 0 ? selectedLocations : undefined,
      industries: selectedIndustries.length > 0 ? selectedIndustries : undefined,
      minMatchScore: minMatchScore > 0 ? minMatchScore : undefined,
    });

    return sortJobs(filtered, sortBy, sortOrder);
  }, [baseJobs, salaryRange, selectedLocations, selectedIndustries, minMatchScore, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSalaryRange([0, 250000]);
    setSelectedLocations([]);
    setSelectedIndustries([]);
    setMinMatchScore(0);
  };

  const hasActiveFilters =
    salaryRange[0] > 0 ||
    salaryRange[1] < 250000 ||
    selectedLocations.length > 0 ||
    selectedIndustries.length > 0 ||
    minMatchScore > 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <PageContainer>
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
            Career Matches
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {matchedJobs.length > 0
              ? `${displayedJobs.length} career opportunities matched to your lifestyle profile`
              : 'Explore available career opportunities in the Cayman Islands'}
          </Typography>
        </Box>

        {/* Alert if no profile */}
        {!lifestyleProfile && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Complete Your Assessment</AlertTitle>
            Take the lifestyle assessment to see personalized career matches with scores.
            <Button
              size="small"
              onClick={() => router.push('/assessment')}
              sx={{ ml: 2 }}
            >
              Start Assessment
            </Button>
          </Alert>
        )}

        {/* Lifestyle Cost Summary (if available) */}
        {lifestyleCost && (
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              background: 'linear-gradient(135deg, rgba(2, 119, 189, 0.05) 0%, rgba(1, 87, 155, 0.05) 100%)',
              border: '1px solid',
              borderColor: 'primary.light',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <TrendingUp sx={{ color: 'primary.main', fontSize: 32 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Your Lifestyle Requires
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {formatCurrency(Math.ceil(lifestyleCost.requiredAnnualSalary))} / year
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto' }}>
                <Chip
                  label={`${displayedJobs.filter(j => j.salaryMin >= lifestyleCost.requiredAnnualSalary).length} jobs meet requirement`}
                  color="success"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Box>
          </Paper>
        )}

        {/* Filters and Sorting */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: showFilters ? 2 : 0 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button
                variant={showFilters ? 'contained' : 'outlined'}
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
                endIcon={showFilters ? <ExpandLess /> : <ExpandMore />}
              >
                Filters
                {hasActiveFilters && (
                  <Chip
                    label="Active"
                    size="small"
                    color="primary"
                    sx={{ ml: 1, height: 20 }}
                  />
                )}
              </Button>

              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={<Sort sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="matchScore">Match Score</MenuItem>
                  <MenuItem value="salary">Salary</MenuItem>
                  <MenuItem value="location">Location</MenuItem>
                  <MenuItem value="industry">Industry</MenuItem>
                </Select>
              </FormControl>

              <Button
                size="small"
                variant="outlined"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
              </Button>

              {hasActiveFilters && (
                <Button size="small" onClick={handleResetFilters} color="secondary">
                  Reset Filters
                </Button>
              )}
            </Box>

            <Typography variant="body2" color="text.secondary">
              Showing {displayedJobs.length} of {baseJobs.length} jobs
            </Typography>
          </Box>

          <Collapse in={showFilters}>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              {/* Salary Range */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Salary Range
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={salaryRange}
                    onChange={(_, value) => setSalaryRange(value as [number, number])}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => formatCurrency(value)}
                    min={0}
                    max={250000}
                    step={5000}
                    marks={[
                      { value: 0, label: 'CI$0' },
                      { value: 125000, label: 'CI$125K' },
                      { value: 250000, label: 'CI$250K' },
                    ]}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(salaryRange[0])} - {formatCurrency(salaryRange[1])}
                  </Typography>
                </Box>
              </Grid>

              {/* Match Score Filter (only if profile exists) */}
              {lifestyleProfile && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Minimum Match Score
                  </Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={minMatchScore}
                      onChange={(_, value) => setMinMatchScore(value as number)}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                      min={0}
                      max={100}
                      step={5}
                      marks={[
                        { value: 0, label: 'Any' },
                        { value: 50, label: '50%' },
                        { value: 100, label: '100%' },
                      ]}
                    />
                  </Box>
                </Grid>
              )}

              {/* Location Filter */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Locations</InputLabel>
                  <Select
                    multiple
                    value={selectedLocations}
                    onChange={(e) => setSelectedLocations(e.target.value as string[])}
                    label="Locations"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {locations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Industry Filter */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Industries</InputLabel>
                  <Select
                    multiple
                    value={selectedIndustries}
                    onChange={(e) => setSelectedIndustries(e.target.value as string[])}
                    label="Industries"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" color="secondary" />
                        ))}
                      </Box>
                    )}
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        </Paper>

        {/* Job Cards Grid */}
        {displayedJobs.length > 0 ? (
          <Grid container spacing={3}>
            {displayedJobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job.id}>
                <CareerCard
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  salaryMin={job.salaryMin}
                  salaryMax={job.salaryMax}
                  location={job.location}
                  matchScore={job.matchScore}
                  educationLevel={job.educationLevel}
                  industry={job.industry}
                  onViewPathway={() => router.push(`/pathway/${job.id}`)}
                  onSave={() => console.log('Save career:', job.id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No jobs match your current filters
            </Typography>
            <Button onClick={handleResetFilters} variant="outlined" sx={{ mt: 2 }}>
              Reset Filters
            </Button>
          </Paper>
        )}
      </PageContainer>
    </Box>
  );
}
