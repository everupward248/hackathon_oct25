/**
 * Career Matching Algorithm
 * Scores jobs based on how well they match a user's lifestyle profile
 *
 * This algorithm can run client-side for the prototype or be moved to backend later
 */

import { Job } from '../data/jobs';
import { EDUCATION_LEVELS } from '../constants';

export interface LifestyleProfile {
  requiredAnnualSalary: number;  // Calculated from lifestyle needs
  preferredLocations: string[];
  currentEducationLevel: string;
  yearsOfExperience: string;
  preferredIndustries?: string[];
  priorities?: {
    salary: number;         // 0-100
    location: number;       // 0-100
    workLifeBalance: number; // 0-100
  };
}

export interface ScoredJob extends Job {
  matchScore: number;        // Overall match (0-100)
  salaryFit: number;         // How well salary matches need (0-100)
  locationFit: number;       // Location preference fit (0-100)
  educationFit: number;      // Education requirement fit (0-100)
  breakdown?: {
    salaryScore: number;
    locationScore: number;
    educationScore: number;
    experienceScore: number;
    industryScore: number;
  };
}

/**
 * Calculate salary fit score
 * 100 = salary perfectly covers required amount
 * 0 = salary far below required amount
 */
function calculateSalaryFit(
  jobSalaryMin: number,
  jobSalaryMax: number,
  requiredSalary: number
): number {
  const jobAvgSalary = (jobSalaryMin + jobSalaryMax) / 2;

  if (jobAvgSalary >= requiredSalary) {
    // Salary meets or exceeds requirement
    const excess = jobAvgSalary - requiredSalary;
    const excessRatio = excess / requiredSalary;

    // Perfect score if salary is 100-150% of required
    if (excessRatio <= 0.5) {
      return 100;
    }
    // Slight penalty for significantly higher (may be overqualified)
    return Math.max(85, 100 - (excessRatio - 0.5) * 20);
  } else {
    // Salary below requirement - penalize proportionally
    const shortfall = requiredSalary - jobAvgSalary;
    const shortfallRatio = shortfall / requiredSalary;

    // 80% of required = 50 points, 50% of required = 0 points
    return Math.max(0, 100 - (shortfallRatio * 200));
  }
}

/**
 * Calculate location fit score
 * 100 = exact match with preferred location
 * 50 = different location in same area
 * 0 = no match
 */
function calculateLocationFit(
  jobLocation: string,
  preferredLocations: string[]
): number {
  if (preferredLocations.length === 0) {
    return 100; // No preference = all locations acceptable
  }

  const normalizedJobLocation = jobLocation.toLowerCase().trim();

  // Exact match
  if (preferredLocations.some(loc =>
    normalizedJobLocation.includes(loc.toLowerCase())
  )) {
    return 100;
  }

  // Partial match (e.g., both in George Town area)
  if (normalizedJobLocation.includes('george') &&
      preferredLocations.some(loc => loc.toLowerCase().includes('george'))) {
    return 90;
  }

  // Remote work is generally acceptable
  if (normalizedJobLocation.includes('remote')) {
    return 95;
  }

  // Different location but still on Grand Cayman
  const grandCaymanLocations = ['george town', 'west bay', 'bodden town', 'north side', 'east end'];
  if (grandCaymanLocations.some(loc => normalizedJobLocation.includes(loc))) {
    return 50;
  }

  // Other islands
  return 30;
}

/**
 * Calculate education fit score
 * 100 = user meets or exceeds requirement
 * Lower scores for not meeting requirement
 */
function calculateEducationFit(
  jobEducationLevel: string,
  userEducationLevel: string
): number {
  const educationHierarchy: { [key: string]: number } = {
    'high school or equivalent': 1,
    'some college/university': 2,
    'certificate/diploma': 2.5,
    "associate's degree": 3,
    "bachelor's degree": 4,
    "master's degree": 5,
    'doctoral degree': 6,
    'professional certification': 3.5,
  };

  const jobLevel = educationHierarchy[jobEducationLevel.toLowerCase()] || 2;
  const userLevel = educationHierarchy[userEducationLevel.toLowerCase()] || 2;

  if (userLevel >= jobLevel) {
    // User meets or exceeds requirement
    return 100;
  } else {
    // User below requirement
    const gap = jobLevel - userLevel;
    // 1 level below = 70 points, 2 levels = 40 points, 3+ levels = 10 points
    return Math.max(10, 100 - (gap * 30));
  }
}

/**
 * Calculate experience fit score
 */
function calculateExperienceFit(
  jobExperienceYears: string,
  userExperienceYears: string
): number {
  const experienceLevelMap: { [key: string]: number } = {
    'less than 1 year': 0.5,
    '0-1 years': 0.5,
    '1-2 years': 1.5,
    '2-3 years': 2.5,
    '3-4 years': 3.5,
    '4-5 years': 4.5,
    '5-6 years': 5.5,
    '7-10 years': 8.5,
    '10+ years': 12,
  };

  const jobExp = experienceLevelMap[jobExperienceYears.toLowerCase()] || 3;
  const userExp = experienceLevelMap[userExperienceYears.toLowerCase()] || 3;

  if (userExp >= jobExp) {
    return 100;
  } else {
    const gap = jobExp - userExp;
    return Math.max(20, 100 - (gap * 15));
  }
}

/**
 * Calculate industry fit score
 */
function calculateIndustryFit(
  jobIndustry: string,
  preferredIndustries?: string[]
): number {
  if (!preferredIndustries || preferredIndustries.length === 0) {
    return 100; // No preference = all industries acceptable
  }

  const normalizedJobIndustry = jobIndustry.toLowerCase();
  const match = preferredIndustries.some(ind =>
    normalizedJobIndustry.includes(ind.toLowerCase()) ||
    ind.toLowerCase().includes(normalizedJobIndustry)
  );

  return match ? 100 : 40; // Partial credit for non-preferred industries
}

/**
 * Main matching function
 * Returns jobs with match scores
 */
export function matchJobsToProfile(
  jobs: Job[],
  profile: LifestyleProfile
): ScoredJob[] {
  const scoredJobs: ScoredJob[] = jobs.map(job => {
    // Calculate individual scores
    const salaryScore = calculateSalaryFit(
      job.salaryMin,
      job.salaryMax,
      profile.requiredAnnualSalary
    );

    const locationScore = calculateLocationFit(
      job.location,
      profile.preferredLocations
    );

    const educationScore = calculateEducationFit(
      job.educationLevel,
      profile.currentEducationLevel
    );

    const experienceScore = calculateExperienceFit(
      job.experienceYears,
      profile.yearsOfExperience
    );

    const industryScore = calculateIndustryFit(
      job.industry,
      profile.preferredIndustries
    );

    // Calculate weighted overall score
    // Priorities determine weights, default to equal if not specified
    const priorities = profile.priorities || {
      salary: 40,
      location: 30,
      workLifeBalance: 30,
    };

    const totalPriority = priorities.salary + priorities.location + priorities.workLifeBalance;
    const salaryWeight = priorities.salary / totalPriority;
    const locationWeight = priorities.location / totalPriority;
    const otherWeight = priorities.workLifeBalance / totalPriority;

    // Overall match score
    const matchScore = Math.round(
      salaryScore * salaryWeight +
      locationScore * locationWeight +
      (educationScore + experienceScore + industryScore) / 3 * otherWeight
    );

    return {
      ...job,
      matchScore,
      salaryFit: Math.round(salaryScore),
      locationFit: Math.round(locationScore),
      educationFit: Math.round(educationScore),
      breakdown: {
        salaryScore: Math.round(salaryScore),
        locationScore: Math.round(locationScore),
        educationScore: Math.round(educationScore),
        experienceScore: Math.round(experienceScore),
        industryScore: Math.round(industryScore),
      },
    };
  });

  // Sort by match score (highest first)
  return scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Filter jobs by criteria
 */
export function filterJobs(
  jobs: ScoredJob[],
  filters: {
    minSalary?: number;
    maxSalary?: number;
    locations?: string[];
    industries?: string[];
    educationLevels?: string[];
    minMatchScore?: number;
  }
): ScoredJob[] {
  return jobs.filter(job => {
    // Salary filter
    if (filters.minSalary && job.salaryMax < filters.minSalary) {
      return false;
    }
    if (filters.maxSalary && job.salaryMin > filters.maxSalary) {
      return false;
    }

    // Location filter
    if (filters.locations && filters.locations.length > 0) {
      const matchesLocation = filters.locations.some(loc =>
        job.location.toLowerCase().includes(loc.toLowerCase())
      );
      if (!matchesLocation) return false;
    }

    // Industry filter
    if (filters.industries && filters.industries.length > 0) {
      const matchesIndustry = filters.industries.some(ind =>
        job.industry.toLowerCase().includes(ind.toLowerCase())
      );
      if (!matchesIndustry) return false;
    }

    // Education filter
    if (filters.educationLevels && filters.educationLevels.length > 0) {
      const matchesEducation = filters.educationLevels.some(edu =>
        job.educationLevel.toLowerCase().includes(edu.toLowerCase())
      );
      if (!matchesEducation) return false;
    }

    // Match score filter
    if (filters.minMatchScore && job.matchScore < filters.minMatchScore) {
      return false;
    }

    return true;
  });
}

/**
 * Sort jobs by criteria
 */
export function sortJobs(
  jobs: ScoredJob[],
  sortBy: 'matchScore' | 'salary' | 'title' | 'company',
  order: 'asc' | 'desc' = 'desc'
): ScoredJob[] {
  const sorted = [...jobs].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'matchScore':
        comparison = a.matchScore - b.matchScore;
        break;
      case 'salary':
        const aSalary = (a.salaryMin + a.salaryMax) / 2;
        const bSalary = (b.salaryMin + b.salaryMax) / 2;
        comparison = aSalary - bSalary;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'company':
        comparison = a.company.localeCompare(b.company);
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
}
