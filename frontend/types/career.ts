import { Job } from "./job";

export interface CareerMatch {
  job: Job;
  match_score: number;
  salary_fit: number;
  location_fit: number;
  education_fit: number;
  reasons: string[];
}

export interface CareerPathway {
  current_role?: string;
  target_role: string;
  intermediate_steps: CareerStep[];
  timeline: string;
  total_cost_of_education: number;
  estimated_salary_growth: number;
}

export interface CareerStep {
  role: string;
  salary_range: {
    min: number;
    max: number;
  };
  required_education: string[];
  required_skills: string[];
  time_to_achieve: string;
  cost_of_education?: number;
}

export interface SkillsGap {
  current_skills: string[];
  required_skills: string[];
  missing_skills: string[];
  education_recommendations: EducationRecommendation[];
}

export interface EducationRecommendation {
  type: string; // "certification", "degree", "course"
  name: string;
  estimated_cost: number;
  estimated_time: string;
  priority: "high" | "medium" | "low";
}

// Enhanced types for detailed pathway visualization
export interface SkillRequirement {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Industry-Specific';
  currentLevel?: 'None' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface SkillGapDetail {
  skill: string;
  currentLevel: 'None' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  requiredLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  gapSize: number; // 0-100, percentage of gap to close
  recommendedActions: string[];
  estimatedTimeToClose: string;
  category: 'Technical' | 'Soft' | 'Industry-Specific';
}

export interface FinancialProjection {
  year: number;
  age?: number;
  role: string;
  salary: number;
  cumulativeIncome: number;
  educationCost: number;
  cumulativeCost: number;
  netGain: number;
  lifestyleAffordability: boolean; // Can afford target lifestyle
  lifestyleCost?: number;
}

export interface PathwayMetrics {
  totalDuration: string;
  totalEducationCost: number;
  salaryIncrease: number;
  salaryIncreasePercentage: number;
  breakEvenPoint: string; // When investment is recovered
  roi: number; // Return on investment percentage
  difficulty: 'Low' | 'Medium' | 'High';
  marketDemand: 'Low' | 'Medium' | 'High';
}
