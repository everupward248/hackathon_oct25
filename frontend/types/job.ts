export interface Job {
  id: string;
  title: string;
  company?: string;
  salary_min: number;
  salary_max: number;
  location: string;
  education_level: string;
  experience_years: number;
  industry: string;
  description?: string;
  posted_date?: string;
}

export interface JobSearchParams {
  location?: string;
  industry?: string;
  min_salary?: number;
  max_salary?: number;
  education_level?: string;
  experience_years?: number;
  limit?: number;
  offset?: number;
}
