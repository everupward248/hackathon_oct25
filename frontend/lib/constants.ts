/**
 * Cayman Islands Cost of Living Data
 * Source: claude.md based on Numbeo, Expatistan, and local data
 */

// Housing costs (monthly, in KYD)
export const HOUSING_COSTS = {
  // City center (George Town)
  '1bed_center': { min: 1800, max: 2500, avg: 2150 },
  '2bed_center': { min: 2500, max: 3500, avg: 3000 },
  '3bed_center': { min: 3500, max: 5000, avg: 4250 },

  // Outside city center
  '1bed_outside': { min: 1200, max: 1800, avg: 1500 },
  '2bed_outside': { min: 1800, max: 2500, avg: 2150 },
  '3bed_outside': { min: 2500, max: 3500, avg: 3000 },

  // Shared accommodation
  'room_shared': { min: 600, max: 1000, avg: 800 },
} as const;

// Utilities (monthly, in KYD)
export const UTILITY_COSTS = {
  basic: { min: 250, max: 400, avg: 325 },  // Electricity, water, garbage
  internet: { min: 75, max: 125, avg: 100 },
  mobile: { min: 50, max: 100, avg: 75 },
} as const;

// Transportation (monthly, in KYD)
export const TRANSPORTATION_COSTS = {
  public_transport: { min: 80, max: 120, avg: 100 },
  car_insurance: { min: 125, max: 250, avg: 187.5 },  // Annual divided by 12
  gas_monthly: { min: 150, max: 300, avg: 225 },
  car_maintenance: { min: 50, max: 100, avg: 75 },
  total_car: { min: 325, max: 650, avg: 487.5 },  // Insurance + gas + maintenance
} as const;

// Food & Dining (monthly, in KYD, per person)
export const FOOD_COSTS = {
  groceries_basic: { min: 400, max: 600, avg: 500 },
  groceries_moderate: { min: 600, max: 800, avg: 700 },
  groceries_premium: { min: 800, max: 1200, avg: 1000 },

  // Dining out frequency multipliers
  dining_occasional: { min: 100, max: 200, avg: 150 },  // 4-8 times/month
  dining_regular: { min: 300, max: 500, avg: 400 },     // 12-20 times/month
  dining_frequent: { min: 600, max: 1000, avg: 800 },   // 24-40 times/month
} as const;

// Entertainment & Leisure (monthly, in KYD, per person)
export const ENTERTAINMENT_COSTS = {
  gym: { min: 80, max: 150, avg: 115 },
  cinema: { min: 25, max: 50, avg: 37.5 },      // 2-4 movies/month
  activities: { min: 100, max: 300, avg: 200 }, // Sports, hobbies
  minimal: { min: 50, max: 100, avg: 75 },
  moderate: { min: 150, max: 300, avg: 225 },
  active: { min: 300, max: 600, avg: 450 },
} as const;

// Childcare (monthly, in KYD, per child)
export const CHILDCARE_COSTS = {
  daycare: { min: 800, max: 1200, avg: 1000 },
  preschool: { min: 600, max: 1000, avg: 800 },
  afterschool: { min: 400, max: 800, avg: 600 },
} as const;

// Savings & Miscellaneous (monthly, in KYD)
export const SAVINGS_COSTS = {
  minimal: { min: 100, max: 200, avg: 150 },
  moderate: { min: 300, max: 500, avg: 400 },
  aggressive: { min: 500, max: 1000, avg: 750 },
} as const;

// Other recurring costs (monthly, in KYD)
export const OTHER_COSTS = {
  clothing: { min: 50, max: 200, avg: 125 },
  healthcare: { min: 100, max: 300, avg: 200 },
  personal_care: { min: 50, max: 150, avg: 100 },
} as const;

// Education levels
export const EDUCATION_LEVELS = [
  { value: 'high-school', label: 'High School or Equivalent', years: 0 },
  { value: 'associate', label: "Associate's Degree", years: 2 },
  { value: 'bachelor', label: "Bachelor's Degree", years: 4 },
  { value: 'master', label: "Master's Degree", years: 6 },
  { value: 'doctorate', label: 'Doctoral Degree', years: 9 },
  { value: 'professional', label: 'Professional Certification', years: 0 },
] as const;

// Experience levels
export const EXPERIENCE_LEVELS = [
  { value: '0-1', label: 'Entry Level (0-1 years)', min: 0, max: 1 },
  { value: '2-3', label: 'Junior (2-3 years)', min: 2, max: 3 },
  { value: '4-6', label: 'Mid-Level (4-6 years)', min: 4, max: 6 },
  { value: '7-10', label: 'Senior (7-10 years)', min: 7, max: 10 },
  { value: '10+', label: 'Expert (10+ years)', min: 10, max: 99 },
] as const;

// Industry categories (based on claude.md insights)
export const INDUSTRIES = [
  { value: 'financial-services', label: 'Financial Services', share: 0.30 },
  { value: 'tourism-hospitality', label: 'Tourism & Hospitality', share: 0.20 },
  { value: 'construction', label: 'Construction & Civil Engineering', share: 0.15 },
  { value: 'healthcare', label: 'Healthcare', share: 0.10 },
  { value: 'technology', label: 'Technology & IT', share: 0.08 },
  { value: 'education', label: 'Education', share: 0.05 },
  { value: 'retail', label: 'Retail & Sales', share: 0.05 },
  { value: 'legal', label: 'Legal Services', share: 0.03 },
  { value: 'other', label: 'Other', share: 0.04 },
] as const;

// Locations in Cayman Islands
export const LOCATIONS = [
  { value: 'george-town', label: 'George Town', share: 0.765 },  // 76.5% of jobs
  { value: 'west-bay', label: 'West Bay', share: 0.10 },
  { value: 'bodden-town', label: 'Bodden Town', share: 0.05 },
  { value: 'north-side', label: 'North Side', share: 0.03 },
  { value: 'east-end', label: 'East End', share: 0.03 },
  { value: 'cayman-brac', label: 'Cayman Brac', share: 0.015 },
  { value: 'little-cayman', label: 'Little Cayman', share: 0.005 },
  { value: 'remote', label: 'Remote', share: 0.01 },
] as const;

// Economic indicators (from claude.md)
export const ECONOMIC_DATA = {
  gdp_growth: 0.031,        // 3.1%
  unemployment: 0.024,      // 2.4%
  avg_salary_min: 40000,    // CI$40k
  avg_salary_max: 120000,   // CI$120k
  cost_of_living_index: 125, // High (100 = US average)
} as const;

// Salary percentiles for Cayman Islands (KYD per year)
export const SALARY_RANGES = {
  entry_level: { min: 24000, max: 40000, avg: 32000 },      // CI$2k-3.3k/month
  junior: { min: 36000, max: 55000, avg: 45500 },           // CI$3k-4.6k/month
  mid_level: { min: 50000, max: 80000, avg: 65000 },        // CI$4.2k-6.7k/month
  senior: { min: 72000, max: 120000, avg: 96000 },          // CI$6k-10k/month
  executive: { min: 100000, max: 250000, avg: 175000 },     // CI$8.3k-21k/month
  c_level: { min: 200000, max: 536640, avg: 368320 },       // Top tier
} as const;

// Helper function to get housing key based on selections
export function getHousingKey(bedrooms: number, location: 'center' | 'outside'): keyof typeof HOUSING_COSTS {
  if (bedrooms === 0) return 'room_shared';
  if (bedrooms === 1) return location === 'center' ? '1bed_center' : '1bed_outside';
  if (bedrooms === 2) return location === 'center' ? '2bed_center' : '2bed_outside';
  return location === 'center' ? '3bed_center' : '3bed_outside';
}

// Helper function to convert annual salary to monthly
export function annualToMonthly(annual: number): number {
  return Math.round(annual / 12);
}

// Helper function to convert monthly to annual
export function monthlyToAnnual(monthly: number): number {
  return monthly * 12;
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return `CI$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
