'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  alpha,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  TrendingUp,
  AccountBalance,
  Percent,
  CalendarToday,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { FinancialProjection as FinancialProjectionType, PathwayMetrics } from '@/types/career';
import { formatCurrency } from '@/lib/constants';

interface FinancialProjectionProps {
  projections: FinancialProjectionType[];
  metrics: PathwayMetrics;
  currentAge?: number;
}

export const FinancialProjection: React.FC<FinancialProjectionProps> = ({
  projections,
  metrics,
  currentAge,
}) => {
  const theme = useTheme();
  const [chartView, setChartView] = useState<'salary' | 'cumulative' | 'roi'>('salary');

  const handleChartViewChange = (_: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setChartView(newView as 'salary' | 'cumulative' | 'roi');
    }
  };

  // Find break-even year
  const breakEvenYear = projections.find((p) => p.netGain >= 0);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card elevation={4} sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Year {label}
            {payload[0]?.payload?.age && ` (Age ${payload[0].payload.age})`}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color, fontSize: '0.85rem' }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </Typography>
          ))}
          {payload[0]?.payload?.role && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Role: {payload[0].payload.role}
            </Typography>
          )}
        </Card>
      );
    }
    return null;
  };

  return (
    <Box>
      {/* Metrics Overview */}
      <Card
        elevation={3}
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Financial Projection & ROI Analysis
          </Typography>

          <Grid container spacing={2}>
            {/* Total Duration */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <CalendarToday fontSize="small" color="primary" />
                  <Typography variant="caption" color="text.secondary">
                    Timeline
                  </Typography>
                </Stack>
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                  {metrics.totalDuration}
                </Typography>
              </Box>
            </Grid>

            {/* Salary Increase */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.success.main, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <TrendingUp fontSize="small" color="success" />
                  <Typography variant="caption" color="text.secondary">
                    Salary Growth
                  </Typography>
                </Stack>
                <Typography variant="h5" color="success.main" sx={{ fontWeight: 700 }}>
                  +{formatCurrency(metrics.salaryIncrease)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  +{metrics.salaryIncreasePercentage}%
                </Typography>
              </Box>
            </Grid>

            {/* ROI */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.secondary.main, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Percent fontSize="small" sx={{ color: 'secondary.main' }} />
                  <Typography variant="caption" color="text.secondary">
                    Return on Investment
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  {metrics.roi}%
                </Typography>
              </Box>
            </Grid>

            {/* Break-even Point */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.info.main, 0.3),
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <AccountBalance fontSize="small" color="info" />
                  <Typography variant="caption" color="text.secondary">
                    Break-Even
                  </Typography>
                </Stack>
                <Typography variant="h5" color="info.main" sx={{ fontWeight: 700 }}>
                  {metrics.breakEvenPoint}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Additional Metrics */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Total Education Cost
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                {formatCurrency(metrics.totalEducationCost)}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Difficulty Level
              </Typography>
              <Chip
                label={metrics.difficulty}
                color={
                  metrics.difficulty === 'Low'
                    ? 'success'
                    : metrics.difficulty === 'Medium'
                    ? 'warning'
                    : 'error'
                }
                sx={{ mt: 0.5 }}
              />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Market Demand
              </Typography>
              <Chip
                label={metrics.marketDemand}
                color={
                  metrics.marketDemand === 'High'
                    ? 'success'
                    : metrics.marketDemand === 'Medium'
                    ? 'warning'
                    : 'error'
                }
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Chart View Toggle */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Financial Timeline
            </Typography>
            <ToggleButtonGroup
              value={chartView}
              exclusive
              onChange={handleChartViewChange}
              size="small"
            >
              <ToggleButton value="salary">Salary Growth</ToggleButton>
              <ToggleButton value="cumulative">Cumulative Income</ToggleButton>
              <ToggleButton value="roi">Net Gain / ROI</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Salary Growth Chart */}
          {chartView === 'salary' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={projections} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Annual Salary (CI$)', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  dot={{ fill: theme.palette.primary.main, r: 5 }}
                  activeDot={{ r: 8 }}
                  name="Salary"
                />
                {projections[0]?.lifestyleCost && (
                  <ReferenceLine
                    y={projections[0].lifestyleCost}
                    stroke={theme.palette.warning.main}
                    strokeDasharray="5 5"
                    label={{ value: 'Lifestyle Cost', fill: theme.palette.warning.dark }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}

          {/* Cumulative Income Chart */}
          {chartView === 'cumulative' && (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={projections} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{
                    value: 'Cumulative Amount (CI$)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="cumulativeIncome"
                  stackId="1"
                  stroke={theme.palette.success.main}
                  fill={alpha(theme.palette.success.main, 0.6)}
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="cumulativeCost"
                  stackId="2"
                  stroke={theme.palette.warning.main}
                  fill={alpha(theme.palette.warning.main, 0.6)}
                  name="Education Cost"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {/* Net Gain / ROI Chart */}
          {chartView === 'roi' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={projections} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ value: 'Net Gain (CI$)', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <ReferenceLine y={0} stroke={theme.palette.text.primary} strokeWidth={2} />
                <Bar
                  dataKey="netGain"
                  name="Net Gain"
                  fill={theme.palette.success.main}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Year-by-Year Breakdown */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Year-by-Year Projection
          </Typography>
          <List>
            {projections.map((projection, index) => (
              <React.Fragment key={projection.year}>
                <ListItem
                  sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    py: 2,
                    bgcolor:
                      projection.year === breakEvenYear?.year
                        ? alpha(theme.palette.success.main, 0.05)
                        : 'transparent',
                  }}
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, minWidth: 80 }}>
                          Year {projection.year}
                        </Typography>
                        {projection.age && (
                          <Chip label={`Age ${projection.age}`} size="small" variant="outlined" />
                        )}
                        {projection.year === breakEvenYear?.year && (
                          <Chip label="Break-Even!" color="success" size="small" />
                        )}
                      </Stack>
                    }
                    secondary={projection.role}
                    sx={{ flex: { xs: '1 1 100%', md: '0 0 250px' } }}
                  />
                  <Grid container spacing={2} sx={{ flex: 1 }}>
                    <Grid item xs={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Salary
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatCurrency(projection.salary)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Education Cost
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                        {formatCurrency(projection.educationCost)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Cumulative Income
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {formatCurrency(projection.cumulativeIncome)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Net Gain
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: projection.netGain >= 0 ? 'success.main' : 'error.main',
                        }}
                      >
                        {formatCurrency(projection.netGain)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {index < projections.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
