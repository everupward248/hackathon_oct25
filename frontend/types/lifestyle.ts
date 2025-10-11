export interface LifestyleProfile {
  id?: string;
  housing_type: string;
  location_preference: string[];
  family_size: number;
  priorities: {
    work_life_balance: number;
    growth: number;
    stability: number;
    salary: number;
  };
  desired_activities: string[];
  monthly_cost: number;
  annual_cost: number;
  created_at?: string;
}

export interface LifestyleAssessmentData {
  housing_type: string;
  housing_location: string;
  bedrooms: number;
  family_size: number;
  has_car: boolean;
  dining_frequency: string;
  entertainment_budget: string;
  travel_frequency: string;
  priorities: {
    work_life_balance: number;
    growth: number;
    stability: number;
    salary: number;
  };
}
