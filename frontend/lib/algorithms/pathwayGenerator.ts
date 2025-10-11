import { Job } from '@/types/job';
import {
  CareerPathway,
  CareerStep,
  SkillsGap,
  EducationRecommendation,
  FinancialProjection,
  PathwayMetrics,
} from '@/types/career';

/**
 * Generate a career pathway from a current position to a target job
 * This creates intermediate steps based on salary progression and skill requirements
 */
export function generateCareerPathway(
  targetJob: Job,
  allJobs: Job[],
  currentRole?: string,
  currentSalary?: number,
  currentSkills?: string[]
): CareerPathway {
  const targetAvgSalary = (targetJob.salaryMin + targetJob.salaryMax) / 2;
  const startingSalary = currentSalary || targetJob.salaryMin * 0.5;

  // Find intermediate roles based on salary progression
  const intermediateSteps: CareerStep[] = [];

  // If there's a significant salary gap, create intermediate steps
  const salaryGap = targetAvgSalary - startingSalary;

  if (salaryGap > 30000) {
    // Need intermediate steps
    const numSteps = Math.ceil(salaryGap / 20000); // One step per ~$20k increase
    const salaryIncrement = salaryGap / numSteps;

    // Find jobs that fit intermediate salary ranges
    for (let i = 0; i < numSteps - 1; i++) {
      const stepSalary = startingSalary + salaryIncrement * (i + 1);
      const intermediateJob = findIntermediateJob(
        allJobs,
        targetJob.industry,
        stepSalary,
        targetJob.occupation
      );

      if (intermediateJob) {
        intermediateSteps.push(
          createCareerStep(
            intermediateJob,
            `${1 + i}-${2 + i} years`,
            i === 0 ? 0 : estimateEducationCost(intermediateJob.educationLevel)
          )
        );
      }
    }
  }

  // Add final target step
  intermediateSteps.push(
    createCareerStep(
      targetJob,
      intermediateSteps.length > 0
        ? `${intermediateSteps.length + 1}-${intermediateSteps.length + 3} years`
        : '2-4 years',
      estimateEducationCost(targetJob.educationLevel)
    )
  );

  // Calculate totals
  const totalCost = intermediateSteps.reduce(
    (sum, step) => sum + (step.cost_of_education || 0),
    0
  );
  const estimatedSalaryGrowth = targetAvgSalary - startingSalary;
  const totalYears = intermediateSteps.length * 2.5; // Average 2.5 years per step

  return {
    current_role: currentRole,
    target_role: targetJob.title,
    intermediate_steps: intermediateSteps,
    timeline: `${Math.ceil(totalYears)} years`,
    total_cost_of_education: totalCost,
    estimated_salary_growth: estimatedSalaryGrowth,
  };
}

/**
 * Find an intermediate job that fits the salary and industry requirements
 */
function findIntermediateJob(
  jobs: Job[],
  targetIndustry: string,
  targetSalary: number,
  targetOccupation: string
): Job | null {
  // Find jobs in same industry with salary close to target
  const candidates = jobs.filter((job) => {
    const avgSalary = (job.salaryMin + job.salaryMax) / 2;
    return (
      job.industry === targetIndustry &&
      Math.abs(avgSalary - targetSalary) < 15000 &&
      job.occupation !== targetOccupation // Different from target
    );
  });

  if (candidates.length === 0) {
    // Broaden search to any industry
    const broadCandidates = jobs.filter((job) => {
      const avgSalary = (job.salaryMin + job.salaryMax) / 2;
      return Math.abs(avgSalary - targetSalary) < 15000;
    });
    return broadCandidates[0] || null;
  }

  // Return job with closest salary
  return candidates.sort((a, b) => {
    const aDiff = Math.abs((a.salaryMin + a.salaryMax) / 2 - targetSalary);
    const bDiff = Math.abs((b.salaryMin + b.salaryMax) / 2 - targetSalary);
    return aDiff - bDiff;
  })[0];
}

/**
 * Create a career step from a job
 */
function createCareerStep(job: Job, timeToAchieve: string, costOfEducation: number): CareerStep {
  return {
    role: job.title,
    salary_range: {
      min: job.salaryMin,
      max: job.salaryMax,
    },
    required_education: [job.educationLevel],
    required_skills: generateSkillsFromJob(job),
    time_to_achieve: timeToAchieve,
    cost_of_education: costOfEducation,
  };
}

/**
 * Generate skills list based on job characteristics
 * In a real app, this would come from a skills database
 */
function generateSkillsFromJob(job: Job): string[] {
  const skills: string[] = [];

  // Industry-specific skills
  switch (job.industry) {
    case 'Financial Services':
      skills.push('Financial Analysis', 'Risk Management', 'Accounting', 'Excel');
      if (job.title.toLowerCase().includes('analyst')) {
        skills.push('Data Analysis', 'Financial Modeling');
      }
      if (job.title.toLowerCase().includes('manager')) {
        skills.push('Team Leadership', 'Strategic Planning');
      }
      break;
    case 'Technology':
      skills.push('Problem Solving', 'Technical Documentation');
      if (job.title.toLowerCase().includes('developer')) {
        skills.push('Programming', 'Software Development', 'Version Control');
      }
      if (job.title.toLowerCase().includes('data')) {
        skills.push('SQL', 'Python', 'Data Analysis');
      }
      break;
    case 'Tourism & Hospitality':
      skills.push('Customer Service', 'Communication', 'Problem Solving');
      if (job.title.toLowerCase().includes('manager')) {
        skills.push('Operations Management', 'Staff Training', 'Budgeting');
      }
      break;
    case 'Healthcare':
      skills.push('Patient Care', 'Medical Terminology', 'Attention to Detail');
      if (job.title.toLowerCase().includes('nurse')) {
        skills.push('Clinical Skills', 'Emergency Response');
      }
      break;
    case 'Construction':
      skills.push('Safety Protocols', 'Project Planning', 'Quality Control');
      if (job.title.toLowerCase().includes('manager')) {
        skills.push('Team Coordination', 'Budget Management');
      }
      break;
    default:
      skills.push('Communication', 'Teamwork', 'Time Management');
  }

  // Experience-based skills
  if (job.experienceYears.includes('5+') || job.experienceYears.includes('10+')) {
    skills.push('Leadership', 'Mentoring');
  }

  // Education-based skills
  if (job.educationLevel.includes('Master') || job.educationLevel.includes('Doctoral')) {
    skills.push('Research', 'Critical Thinking', 'Advanced Analytics');
  }

  return skills.slice(0, 8); // Return top 8 skills
}

/**
 * Estimate education cost based on education level
 */
function estimateEducationCost(educationLevel: string): number {
  if (educationLevel.includes('Doctoral')) return 80000;
  if (educationLevel.includes('Master')) return 45000;
  if (educationLevel.includes('Bachelor')) return 30000;
  if (educationLevel.includes('Associate')) return 15000;
  if (educationLevel.includes('Certification')) return 5000;
  return 0; // High school or no additional education
}

/**
 * Generate skills gap analysis
 */
export function generateSkillsGap(
  targetJob: Job,
  pathway: CareerPathway,
  currentSkills: string[] = []
): SkillsGap {
  // Collect all required skills from pathway
  const allRequiredSkills = new Set<string>();
  pathway.intermediate_steps.forEach((step) => {
    step.required_skills.forEach((skill) => allRequiredSkills.add(skill));
  });

  const requiredSkills = Array.from(allRequiredSkills);
  const missingSkills = requiredSkills.filter((skill) => !currentSkills.includes(skill));

  // Generate education recommendations based on missing skills
  const recommendations: EducationRecommendation[] = [];

  // Group skills by type and create recommendations
  const technicalSkills = missingSkills.filter(
    (s) =>
      s.includes('Programming') ||
      s.includes('SQL') ||
      s.includes('Data') ||
      s.includes('Excel') ||
      s.includes('Software')
  );
  const leadershipSkills = missingSkills.filter(
    (s) => s.includes('Leadership') || s.includes('Management') || s.includes('Strategic')
  );
  const industrySkills = missingSkills.filter(
    (s) => !technicalSkills.includes(s) && !leadershipSkills.includes(s)
  );

  if (technicalSkills.length > 0) {
    recommendations.push({
      type: 'certification',
      name: `${targetJob.industry} Technical Certification`,
      estimated_cost: 3500,
      estimated_time: '6-12 months',
      priority: 'high',
    });
  }

  if (leadershipSkills.length > 0) {
    recommendations.push({
      type: 'course',
      name: 'Leadership and Management Certificate',
      estimated_cost: 2500,
      estimated_time: '4-6 months',
      priority: 'medium',
    });
  }

  if (pathway.intermediate_steps.some((s) => s.required_education.some((e) => e.includes('Bachelor')))) {
    const hasBachelor = pathway.intermediate_steps[0]?.required_education.some((e) =>
      e.includes('Bachelor')
    );
    if (hasBachelor) {
      recommendations.push({
        type: 'degree',
        name: `Bachelor's Degree in ${targetJob.industry}`,
        estimated_cost: 30000,
        estimated_time: '3-4 years',
        priority: 'high',
      });
    }
  }

  if (
    pathway.intermediate_steps.some((s) => s.required_education.some((e) => e.includes('Master')))
  ) {
    recommendations.push({
      type: 'degree',
      name: `Master's Degree in ${targetJob.industry}`,
      estimated_cost: 45000,
      estimated_time: '1.5-2 years',
      priority: 'medium',
    });
  }

  if (industrySkills.length > 0) {
    recommendations.push({
      type: 'course',
      name: `${targetJob.industry} Professional Development`,
      estimated_cost: 1500,
      estimated_time: '2-3 months',
      priority: 'low',
    });
  }

  return {
    current_skills: currentSkills,
    required_skills: requiredSkills,
    missing_skills: missingSkills,
    education_recommendations: recommendations,
  };
}

/**
 * Generate financial projections for the pathway
 */
export function generateFinancialProjections(
  pathway: CareerPathway,
  currentAge?: number,
  lifestyleCost?: number
): { projections: FinancialProjection[]; metrics: PathwayMetrics } {
  const projections: FinancialProjection[] = [];
  let cumulativeIncome = 0;
  let cumulativeCost = 0;
  let currentYear = 1;
  let currentAgeValue = currentAge || 25;

  // Starting position (if exists)
  const startingSalary = pathway.current_role ? 35000 : 0; // Assume $35k starting salary

  if (pathway.current_role && startingSalary > 0) {
    cumulativeIncome += startingSalary;
    projections.push({
      year: currentYear,
      age: currentAgeValue,
      role: pathway.current_role,
      salary: startingSalary,
      cumulativeIncome,
      educationCost: 0,
      cumulativeCost,
      netGain: cumulativeIncome - cumulativeCost,
      lifestyleAffordability: lifestyleCost ? startingSalary >= lifestyleCost : true,
      lifestyleCost,
    });
    currentYear++;
    currentAgeValue++;
  }

  // Process each step in pathway
  pathway.intermediate_steps.forEach((step, index) => {
    const avgSalary = (step.salary_range.min + step.salary_range.max) / 2;
    const yearsInRole = parseInt(step.time_to_achieve.split('-')[1] || '2');
    const educationCost = step.cost_of_education || 0;

    // Add education cost in first year of this step
    cumulativeCost += educationCost;

    // Project for each year in this role
    for (let year = 0; year < yearsInRole; year++) {
      const salary = avgSalary * (1 + year * 0.03); // 3% annual raise
      cumulativeIncome += salary;

      projections.push({
        year: currentYear,
        age: currentAgeValue,
        role: step.role,
        salary,
        cumulativeIncome,
        educationCost: year === 0 ? educationCost : 0,
        cumulativeCost,
        netGain: cumulativeIncome - cumulativeCost,
        lifestyleAffordability: lifestyleCost ? salary >= lifestyleCost : true,
        lifestyleCost,
      });

      currentYear++;
      currentAgeValue++;
    }
  });

  // Calculate metrics
  const firstSalary = projections[0]?.salary || startingSalary;
  const lastSalary = projections[projections.length - 1]?.salary || 0;
  const salaryIncrease = lastSalary - firstSalary;
  const salaryIncreasePercentage = Math.round((salaryIncrease / firstSalary) * 100);

  // Find break-even point
  const breakEvenProjection = projections.find((p) => p.netGain >= 0);
  const breakEvenPoint = breakEvenProjection
    ? `Year ${breakEvenProjection.year}`
    : `${projections.length + 1}+ years`;

  // Calculate ROI
  const finalNetGain = projections[projections.length - 1]?.netGain || 0;
  const roi = pathway.total_cost_of_education > 0
    ? Math.round((finalNetGain / pathway.total_cost_of_education) * 100)
    : 0;

  // Determine difficulty based on education requirements and timeline
  const difficulty: 'Low' | 'Medium' | 'High' =
    pathway.total_cost_of_education > 50000 || projections.length > 8
      ? 'High'
      : pathway.total_cost_of_education > 20000 || projections.length > 5
      ? 'Medium'
      : 'Low';

  // Market demand (simplified - in real app would use labor market data)
  const marketDemand: 'Low' | 'Medium' | 'High' =
    pathway.intermediate_steps[pathway.intermediate_steps.length - 1]?.role
      .toLowerCase()
      .includes('manager') ||
    pathway.intermediate_steps[pathway.intermediate_steps.length - 1]?.role
      .toLowerCase()
      .includes('analyst')
      ? 'High'
      : 'Medium';

  const metrics: PathwayMetrics = {
    totalDuration: pathway.timeline,
    totalEducationCost: pathway.total_cost_of_education,
    salaryIncrease,
    salaryIncreasePercentage,
    breakEvenPoint,
    roi,
    difficulty,
    marketDemand,
  };

  return { projections, metrics };
}

/**
 * Generate multiple pathway options for a target job
 * Returns different pathways with varying timelines and education requirements
 */
export function generatePathwayOptions(
  targetJob: Job,
  allJobs: Job[],
  currentRole?: string,
  currentSalary?: number,
  currentSkills?: string[]
): CareerPathway[] {
  const pathways: CareerPathway[] = [];

  // Option 1: Fast track (higher cost, shorter time)
  const fastTrack = generateCareerPathway(
    targetJob,
    allJobs.filter((j) => j.industry === targetJob.industry),
    currentRole,
    currentSalary,
    currentSkills
  );
  fastTrack.timeline = `${Math.max(3, parseInt(fastTrack.timeline) - 2)} years`;
  pathways.push(fastTrack);

  // Option 2: Standard track
  const standard = generateCareerPathway(targetJob, allJobs, currentRole, currentSalary, currentSkills);
  pathways.push(standard);

  // Option 3: Gradual track (lower cost, longer time)
  const gradual = generateCareerPathway(
    targetJob,
    allJobs,
    currentRole,
    currentSalary,
    currentSkills
  );
  gradual.timeline = `${parseInt(gradual.timeline) + 2} years`;
  gradual.total_cost_of_education = gradual.total_cost_of_education * 0.7; // 30% less cost
  pathways.push(gradual);

  return pathways;
}
