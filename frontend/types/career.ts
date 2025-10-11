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
