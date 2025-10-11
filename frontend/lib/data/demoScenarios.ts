import { AssessmentStep } from '@/lib/store/profileStore';

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  persona: {
    name: string;
    age: number;
    currentSituation: string;
    goals: string[];
  };
  assessmentData: AssessmentStep;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'recent-grad',
    name: 'Recent Graduate',
    description: 'Young professional starting their career, wants modest lifestyle',
    persona: {
      name: 'Sarah Chen',
      age: 23,
      currentSituation: 'Just graduated from university, first job search',
      goals: [
        'Find entry-level position in finance',
        'Live independently in George Town',
        'Save for future',
        'Build professional network',
      ],
    },
    assessmentData: {
      housing: {
        bedrooms: 1,
        housingLocation: 'outside',
      },
      lifestyle: {
        familySize: 1,
        numChildren: 0,
        transportationType: 'public',
        groceryLevel: 'basic',
        diningFrequency: 'occasional',
        entertainmentLevel: 'minimal',
        hasGym: false,
        savingsGoal: 'moderate',
        monthlyCost: 0,
      },
      careerPreferences: {
        preferredLocations: ['George Town', 'Seven Mile Beach'],
        preferredIndustries: ['Financial Services', 'Technology'],
        currentEducationLevel: "Bachelor's Degree",
        yearsOfExperience: '0-2 years',
        willingToRelocate: false,
        workLifeBalance: 7,
        careerGrowth: 8,
        jobStability: 6,
      },
    },
  },
  {
    id: 'young-family',
    name: 'Young Family',
    description: 'Couple with one child, looking for stable career with family-friendly lifestyle',
    persona: {
      name: 'Michael & Lisa Rodriguez',
      age: 32,
      currentSituation: 'One working parent, one child in daycare, renting 2BR apartment',
      goals: [
        'Increase household income',
        'Move to 3-bedroom house',
        'Ensure quality childcare',
        'Plan for second child',
      ],
    },
    assessmentData: {
      housing: {
        bedrooms: 3,
        housingLocation: 'outside',
      },
      lifestyle: {
        familySize: 3,
        numChildren: 1,
        transportationType: 'car',
        groceryLevel: 'moderate',
        diningFrequency: 'occasional',
        entertainmentLevel: 'moderate',
        hasGym: false,
        savingsGoal: 'moderate',
        monthlyCost: 0,
      },
      careerPreferences: {
        preferredLocations: ['George Town', 'West Bay', 'Bodden Town'],
        preferredIndustries: [
          'Financial Services',
          'Healthcare',
          'Education',
          'Government & Public Services',
        ],
        currentEducationLevel: "Bachelor's Degree",
        yearsOfExperience: '5-10 years',
        willingToRelocate: false,
        workLifeBalance: 9,
        careerGrowth: 7,
        jobStability: 9,
      },
    },
  },
  {
    id: 'career-changer',
    name: 'Career Changer',
    description: 'Mid-career professional transitioning from tourism to finance',
    persona: {
      name: 'James Thompson',
      age: 35,
      currentSituation: 'Hotel manager looking to transition to finance sector',
      goals: [
        'Transition to financial services',
        'Obtain relevant certifications',
        'Maintain current lifestyle during transition',
        'Increase earning potential',
      ],
    },
    assessmentData: {
      housing: {
        bedrooms: 2,
        housingLocation: 'center',
      },
      lifestyle: {
        familySize: 2,
        numChildren: 0,
        transportationType: 'car',
        groceryLevel: 'moderate',
        diningFrequency: 'regular',
        entertainmentLevel: 'active',
        hasGym: true,
        savingsGoal: 'moderate',
        monthlyCost: 0,
      },
      careerPreferences: {
        preferredLocations: ['George Town', 'Seven Mile Beach'],
        preferredIndustries: ['Financial Services', 'Business Services'],
        currentEducationLevel: "Bachelor's Degree",
        yearsOfExperience: '10+ years',
        willingToRelocate: false,
        workLifeBalance: 7,
        careerGrowth: 9,
        jobStability: 7,
      },
    },
  },
  {
    id: 'ambitious-professional',
    name: 'Ambitious Professional',
    description: 'High-achiever targeting executive roles with premium lifestyle',
    persona: {
      name: 'Patricia Williams',
      age: 38,
      currentSituation: 'Senior financial analyst aiming for management positions',
      goals: [
        'Reach C-level or senior management',
        'Purchase luxury property',
        'Maintain high quality of life',
        'Invest in professional development',
      ],
    },
    assessmentData: {
      housing: {
        bedrooms: 3,
        housingLocation: 'center',
      },
      lifestyle: {
        familySize: 1,
        numChildren: 0,
        transportationType: 'car',
        groceryLevel: 'premium',
        diningFrequency: 'frequent',
        entertainmentLevel: 'active',
        hasGym: true,
        savingsGoal: 'aggressive',
        monthlyCost: 0,
      },
      careerPreferences: {
        preferredLocations: ['George Town', 'Seven Mile Beach'],
        preferredIndustries: ['Financial Services', 'Legal Services', 'Business Services'],
        currentEducationLevel: "Master's Degree",
        yearsOfExperience: '10+ years',
        willingToRelocate: false,
        workLifeBalance: 5,
        careerGrowth: 10,
        jobStability: 7,
      },
    },
  },
  {
    id: 'large-family',
    name: 'Large Family',
    description: 'Family with multiple children, prioritizing stability and space',
    persona: {
      name: 'David & Maria Johnson',
      age: 40,
      currentSituation: 'Two working parents with three children, need larger home',
      goals: [
        'Secure stable income for family of 5',
        'Find spacious housing',
        'Quality education for children',
        'Work-life balance',
      ],
    },
    assessmentData: {
      housing: {
        bedrooms: 4,
        housingLocation: 'outside',
      },
      lifestyle: {
        familySize: 5,
        numChildren: 3,
        transportationType: 'car',
        groceryLevel: 'moderate',
        diningFrequency: 'occasional',
        entertainmentLevel: 'moderate',
        hasGym: false,
        savingsGoal: 'moderate',
        monthlyCost: 0,
      },
      careerPreferences: {
        preferredLocations: ['West Bay', 'Bodden Town', 'East End'],
        preferredIndustries: [
          'Education',
          'Healthcare',
          'Government & Public Services',
          'Retail & Customer Service',
        ],
        currentEducationLevel: "Bachelor's Degree",
        yearsOfExperience: '10+ years',
        willingToRelocate: false,
        workLifeBalance: 10,
        careerGrowth: 5,
        jobStability: 10,
      },
    },
  },
  {
    id: 'minimalist',
    name: 'Minimalist Lifestyle',
    description: 'Simple living focused on work-life balance and sustainability',
    persona: {
      name: 'Alex Martinez',
      age: 28,
      currentSituation: 'Tech professional prioritizing experiences over possessions',
      goals: [
        'Work remotely or flexible schedule',
        'Minimal living expenses',
        'Focus on health and wellness',
        'Save for travel and experiences',
      ],
    },
    assessmentData: {
      housing: {
        bedrooms: 1,
        housingLocation: 'outside',
      },
      lifestyle: {
        familySize: 1,
        numChildren: 0,
        transportationType: 'public',
        groceryLevel: 'basic',
        diningFrequency: 'occasional',
        entertainmentLevel: 'minimal',
        hasGym: true,
        savingsGoal: 'aggressive',
        monthlyCost: 0,
      },
      careerPreferences: {
        preferredLocations: ['George Town', 'Bodden Town'],
        preferredIndustries: ['Technology', 'Business Services', 'Creative & Media'],
        currentEducationLevel: "Bachelor's Degree",
        yearsOfExperience: '2-5 years',
        willingToRelocate: false,
        workLifeBalance: 10,
        careerGrowth: 6,
        jobStability: 5,
      },
    },
  },
];

// Helper function to load a demo scenario
export function loadDemoScenario(scenarioId: string): DemoScenario | null {
  return DEMO_SCENARIOS.find((s) => s.id === scenarioId) || null;
}

// Helper function to get scenario summaries for display
export function getDemoScenarioSummaries() {
  return DEMO_SCENARIOS.map((scenario) => ({
    id: scenario.id,
    name: scenario.name,
    description: scenario.description,
    personaName: scenario.persona.name,
    age: scenario.persona.age,
  }));
}
