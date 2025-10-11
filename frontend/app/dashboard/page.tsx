'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Stack,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  Visibility,
  Compare,
  Download,
  Share,
  MoreVert,
  Assessment,
  Work,
  TrendingUp,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { PageContainer } from '@/components/ui';
import { useProfileStore } from '@/lib/store/profileStore';
import { formatCurrency } from '@/lib/constants';
import { SAMPLE_JOBS } from '@/lib/data/jobs';

export default function DashboardPage() {
  const router = useRouter();
  const theme = useTheme();
  const {
    savedProfiles,
    activeProfileId,
    lifestyleCost,
    matchedJobs,
    assessmentData,
    loadProfile,
    deleteProfile,
    resetAssessment,
  } = useProfileStore();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuProfileId, setMenuProfileId] = useState<string | null>(null);

  // Mock saved jobs (in real app, this would be in store)
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, profileId: string) => {
    setAnchorEl(event.currentTarget);
    setMenuProfileId(profileId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuProfileId(null);
  };

  const handleDeleteClick = (profileId: string) => {
    setProfileToDelete(profileId);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (profileToDelete) {
      deleteProfile(profileToDelete);
      setDeleteDialogOpen(false);
      setProfileToDelete(null);
    }
  };

  const handleLoadProfile = (profileId: string) => {
    loadProfile(profileId);
    handleMenuClose();
    router.push('/careers');
  };

  const handleCompareToggle = (profileId: string) => {
    if (selectedForCompare.includes(profileId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== profileId));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, profileId]);
    }
  };

  const handleCompare = () => {
    if (selectedForCompare.length >= 2) {
      router.push(`/compare?profiles=${selectedForCompare.join(',')}`);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const currentProfile = savedProfiles.find((p) => p.id === activeProfileId);

  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* Header */}
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
            My Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your lifestyle profiles, saved careers, and track your progress
          </Typography>
        </Box>

        {/* Current Active Profile */}
        {currentProfile && lifestyleCost && (
          <Card
            elevation={3}
            sx={{
              mb: 4,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Active Profile: {currentProfile.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last updated: {new Date(currentProfile.timestamp).toLocaleDateString()}
                  </Typography>
                </Box>
                <Chip label="Active" color="success" />
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Required Salary
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      {formatCurrency(lifestyleCost.requiredAnnualSalary)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      per year
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Matched Jobs
                    </Typography>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
                      {matchedJobs.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      careers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Housing Type
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {assessmentData.housing.bedrooms} bedroom
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {assessmentData.housing.housingLocation}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Family Size
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {assessmentData.lifestyle.familySize} people
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {assessmentData.lifestyle.numChildren} children
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<Work />}
                  onClick={() => router.push('/careers')}
                >
                  View Matched Careers
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => router.push('/assessment')}
                >
                  Update Profile
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* No active profile message */}
        {!currentProfile && (
          <Alert severity="info" sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Get Started with Your Career Assessment
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Take our 5-minute lifestyle assessment to discover careers that match your goals.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Assessment />}
              onClick={() => router.push('/assessment')}
              size="small"
            >
              Start Assessment
            </Button>
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Saved Profiles */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Saved Profiles ({savedProfiles.length})
                  </Typography>
                  {savedProfiles.length > 1 && (
                    <Button
                      size="small"
                      startIcon={<Compare />}
                      onClick={() => setCompareMode(!compareMode)}
                      variant={compareMode ? 'contained' : 'outlined'}
                    >
                      {compareMode ? 'Comparing' : 'Compare'}
                    </Button>
                  )}
                </Stack>

                {compareMode && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Select 2-3 profiles to compare. Currently selected: {selectedForCompare.length}
                    {selectedForCompare.length >= 2 && (
                      <Button
                        size="small"
                        onClick={handleCompare}
                        sx={{ ml: 2 }}
                        variant="contained"
                      >
                        Compare Selected
                      </Button>
                    )}
                  </Alert>
                )}

                {savedProfiles.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      No saved profiles yet
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => router.push('/assessment')}
                    >
                      Create Profile
                    </Button>
                  </Box>
                ) : (
                  <List>
                    {savedProfiles.map((profile, index) => (
                      <React.Fragment key={profile.id}>
                        <ListItem
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: selectedForCompare.includes(profile.id)
                              ? alpha(theme.palette.primary.main, 0.1)
                              : 'transparent',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        >
                          {compareMode && (
                            <IconButton
                              onClick={() => handleCompareToggle(profile.id)}
                              sx={{ mr: 1 }}
                              disabled={
                                !selectedForCompare.includes(profile.id) &&
                                selectedForCompare.length >= 3
                              }
                            >
                              {selectedForCompare.includes(profile.id) ? (
                                <Favorite color="primary" />
                              ) : (
                                <FavoriteBorder />
                              )}
                            </IconButton>
                          )}
                          <ListItemText
                            primary={profile.name}
                            secondary={
                              <>
                                {formatCurrency(profile.lifestyleCost.requiredAnnualSalary)} / year
                                <br />
                                {new Date(profile.timestamp).toLocaleDateString()}
                              </>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={(e) => handleMenuOpen(e, profile.id)}
                            >
                              <MoreVert />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < savedProfiles.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => menuProfileId && handleLoadProfile(menuProfileId)}>
                    <Visibility sx={{ mr: 1 }} /> Load Profile
                  </MenuItem>
                  <MenuItem onClick={() => menuProfileId && handleDeleteClick(menuProfileId)}>
                    <Delete sx={{ mr: 1 }} color="error" /> Delete
                  </MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Grid>

          {/* Saved Jobs */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Saved Careers ({savedJobs.length})
                </Typography>

                {savedJobs.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      No saved careers yet
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<Work />}
                      onClick={() => router.push('/careers')}
                    >
                      Browse Careers
                    </Button>
                  </Box>
                ) : (
                  <List>
                    {savedJobs.map((jobId, index) => {
                      const job = SAMPLE_JOBS.find((j) => j.id === jobId);
                      if (!job) return null;

                      return (
                        <React.Fragment key={jobId}>
                          <ListItem
                            sx={{
                              borderRadius: 2,
                              mb: 1,
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                              },
                            }}
                          >
                            <ListItemText
                              primary={job.title}
                              secondary={
                                <>
                                  {job.company}
                                  <br />
                                  {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                                </>
                              }
                            />
                            <ListItemSecondaryAction>
                              <Stack direction="row" spacing={1}>
                                <IconButton
                                  size="small"
                                  onClick={() => router.push(`/pathway/${jobId}`)}
                                >
                                  <TrendingUp />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => toggleSaveJob(jobId)}
                                  color="error"
                                >
                                  <Delete />
                                </IconButton>
                              </Stack>
                            </ListItemSecondaryAction>
                          </ListItem>
                          {index < savedJobs.length - 1 && <Divider />}
                        </React.Fragment>
                      );
                    })}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Card elevation={2} sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Assessment />}
                  onClick={() => router.push('/assessment')}
                  sx={{ py: 1.5 }}
                >
                  New Assessment
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Work />}
                  onClick={() => router.push('/careers')}
                  sx={{ py: 1.5 }}
                >
                  Browse Careers
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Share />}
                  disabled={!currentProfile}
                  sx={{ py: 1.5 }}
                >
                  Share Profile
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Download />}
                  disabled={!currentProfile}
                  sx={{ py: 1.5 }}
                >
                  Export Data
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Profile?</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this profile? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageContainer>
  );
}
