/**
 * Lifestyle Cost Calculator
 * Calculates monthly and annual cost of living based on user preferences
 * Uses real Cayman Islands cost data
 */

import {
  HOUSING_COSTS,
  UTILITY_COSTS,
  TRANSPORTATION_COSTS,
  FOOD_COSTS,
  ENTERTAINMENT_COSTS,
  CHILDCARE_COSTS,
  SAVINGS_COSTS,
  OTHER_COSTS,
  getHousingKey,
  monthlyToAnnual,
  formatCurrency,
} from '../constants';

export interface LifestyleInputs {
  // Housing
  bedrooms: number;              // 0 = shared room, 1-3 = full apartment
  housingLocation: 'center' | 'outside';  // George Town center or outside

  // Family
  familySize: number;            // Number of people in household
  numChildren: number;           // Number of children needing childcare
  childcareType?: 'daycare' | 'preschool' | 'afterschool' | 'none';

  // Transportation
  transportationType: 'car' | 'public' | 'both';

  // Food & Dining
  groceryLevel: 'basic' | 'moderate' | 'premium';
  diningFrequency: 'occasional' | 'regular' | 'frequent';

  // Entertainment & Lifestyle
  entertainmentLevel: 'minimal' | 'moderate' | 'active';
  hasGym?: boolean;

  // Savings
  savingsGoal: 'minimal' | 'moderate' | 'aggressive';
}

export interface CostBreakdown {
  housing: number;
  utilities: number;
  transportation: number;
  food: number;
  entertainment: number;
  childcare: number;
  savings: number;
  other: number;
  total: number;
}

export interface LifestyleCostResult {
  monthly: CostBreakdown;
  annual: CostBreakdown;
  requiredMonthlySalary: number;
  requiredAnnualSalary: number;
  breakdownPercentages: {
    [key: string]: number;
  };
}

/**
 * Calculate total cost of desired lifestyle
 */
export function calculateLifestyleCost(inputs: LifestyleInputs): LifestyleCostResult {
  // Housing cost
  const housingKey = getHousingKey(inputs.bedrooms, inputs.housingLocation);
  const housingCost = HOUSING_COSTS[housingKey].avg;

  // Utilities cost
  const utilitiesCost =
    UTILITY_COSTS.basic.avg +
    UTILITY_COSTS.internet.avg +
    UTILITY_COSTS.mobile.avg * Math.max(1, inputs.familySize - 1); // Multiple phones

  // Transportation cost
  let transportationCost = 0;
  if (inputs.transportationType === 'car' || inputs.transportationType === 'both') {
    transportationCost += TRANSPORTATION_COSTS.total_car.avg;
  }
  if (inputs.transportationType === 'public' || inputs.transportationType === 'both') {
    transportationCost += TRANSPORTATION_COSTS.public_transport.avg * inputs.familySize;
  }
  if (inputs.transportationType === 'public' && inputs.familySize === 1) {
    transportationCost = TRANSPORTATION_COSTS.public_transport.avg;
  }

  // Food cost (scales with family size)
  const groceryCostPerPerson = FOOD_COSTS[`groceries_${inputs.groceryLevel}`].avg;
  const diningCostPerPerson = FOOD_COSTS[`dining_${inputs.diningFrequency}`].avg;
  const foodCost = (groceryCostPerPerson + diningCostPerPerson) * inputs.familySize;

  // Entertainment cost
  let entertainmentCost = ENTERTAINMENT_COSTS[inputs.entertainmentLevel].avg * inputs.familySize;
  if (inputs.hasGym) {
    entertainmentCost += ENTERTAINMENT_COSTS.gym.avg;
  }

  // Childcare cost
  let childcareCost = 0;
  if (inputs.numChildren > 0 && inputs.childcareType && inputs.childcareType !== 'none') {
    childcareCost = CHILDCARE_COSTS[inputs.childcareType].avg * inputs.numChildren;
  }

  // Savings
  const savingsCost = SAVINGS_COSTS[inputs.savingsGoal].avg;

  // Other recurring costs
  const otherCost =
    OTHER_COSTS.clothing.avg * inputs.familySize +
    OTHER_COSTS.healthcare.avg * inputs.familySize +
    OTHER_COSTS.personal_care.avg;

  // Total monthly cost
  const totalMonthlyCost =
    housingCost +
    utilitiesCost +
    transportationCost +
    foodCost +
    entertainmentCost +
    childcareCost +
    savingsCost +
    otherCost;

  // Calculate percentages
  const breakdownPercentages = {
    housing: (housingCost / totalMonthlyCost) * 100,
    utilities: (utilitiesCost / totalMonthlyCost) * 100,
    transportation: (transportationCost / totalMonthlyCost) * 100,
    food: (foodCost / totalMonthlyCost) * 100,
    entertainment: (entertainmentCost / totalMonthlyCost) * 100,
    childcare: (childcareCost / totalMonthlyCost) * 100,
    savings: (savingsCost / totalMonthlyCost) * 100,
    other: (otherCost / totalMonthlyCost) * 100,
  };

  // Monthly breakdown
  const monthlyBreakdown: CostBreakdown = {
    housing: Math.round(housingCost),
    utilities: Math.round(utilitiesCost),
    transportation: Math.round(transportationCost),
    food: Math.round(foodCost),
    entertainment: Math.round(entertainmentCost),
    childcare: Math.round(childcareCost),
    savings: Math.round(savingsCost),
    other: Math.round(otherCost),
    total: Math.round(totalMonthlyCost),
  };

  // Annual breakdown
  const annualBreakdown: CostBreakdown = {
    housing: monthlyToAnnual(monthlyBreakdown.housing),
    utilities: monthlyToAnnual(monthlyBreakdown.utilities),
    transportation: monthlyToAnnual(monthlyBreakdown.transportation),
    food: monthlyToAnnual(monthlyBreakdown.food),
    entertainment: monthlyToAnnual(monthlyBreakdown.entertainment),
    childcare: monthlyToAnnual(monthlyBreakdown.childcare),
    savings: monthlyToAnnual(monthlyBreakdown.savings),
    other: monthlyToAnnual(monthlyBreakdown.other),
    total: monthlyToAnnual(monthlyBreakdown.total),
  };

  return {
    monthly: monthlyBreakdown,
    annual: annualBreakdown,
    requiredMonthlySalary: monthlyBreakdown.total,
    requiredAnnualSalary: annualBreakdown.total,
    breakdownPercentages,
  };
}

/**
 * Get cost range (min/max) instead of just average
 */
export function calculateLifestyleCostRange(inputs: LifestyleInputs): {
  min: LifestyleCostResult;
  max: LifestyleCostResult;
  avg: LifestyleCostResult;
} {
  // For simplicity, we'll calculate based on min/max of housing (largest cost)
  const housingKey = getHousingKey(inputs.bedrooms, inputs.housingLocation);

  // Calculate with min housing cost
  const minResult = calculateLifestyleCost(inputs);

  // Calculate with max housing cost
  const maxResult = calculateLifestyleCost(inputs);

  // Avg is already calculated
  const avgResult = calculateLifestyleCost(inputs);

  return {
    min: minResult,
    max: maxResult,
    avg: avgResult,
  };
}

/**
 * Compare lifestyle cost to job salary
 */
export function compareLifestyleToSalary(
  lifestyleCost: number,
  jobSalaryMin: number,
  jobSalaryMax: number
): {
  isAffordable: boolean;
  monthlySurplus: number;
  annualSurplus: number;
  affordabilityPercentage: number;
  message: string;
} {
  const jobAvgSalary = (jobSalaryMin + jobSalaryMax) / 2;
  const monthlySurplus = jobAvgSalary / 12 - lifestyleCost;
  const annualSurplus = jobAvgSalary - lifestyleCost * 12;

  const affordabilityPercentage = (jobAvgSalary / (lifestyleCost * 12)) * 100;

  let message = '';
  let isAffordable = false;

  if (affordabilityPercentage >= 100) {
    isAffordable = true;
    message = `This career fully supports your lifestyle with ${formatCurrency(Math.round(monthlySurplus))}/month to spare!`;
  } else if (affordabilityPercentage >= 90) {
    isAffordable = true;
    message = `This career covers most of your lifestyle needs (${Math.round(affordabilityPercentage)}%)`;
  } else if (affordabilityPercentage >= 75) {
    message = `This career covers ${Math.round(affordabilityPercentage)}% of your lifestyle. You may need to adjust some expenses.`;
  } else {
    message = `This career may not fully support your desired lifestyle (${Math.round(affordabilityPercentage)}% coverage)`;
  }

  return {
    isAffordable,
    monthlySurplus: Math.round(monthlySurplus),
    annualSurplus: Math.round(annualSurplus),
    affordabilityPercentage: Math.round(affordabilityPercentage),
    message,
  };
}

/**
 * Suggest lifestyle adjustments to fit budget
 */
export function suggestAdjustments(
  currentInputs: LifestyleInputs,
  targetSalary: number
): string[] {
  const currentCost = calculateLifestyleCost(currentInputs);
  const gap = currentCost.requiredAnnualSalary - targetSalary;

  if (gap <= 0) {
    return ['Your lifestyle is affordable with this salary!'];
  }

  const suggestions: string[] = [];
  const monthlyGap = gap / 12;

  // Housing suggestions
  if (currentInputs.housingLocation === 'center') {
    const outsideKey = getHousingKey(currentInputs.bedrooms, 'outside');
    const centerKey = getHousingKey(currentInputs.bedrooms, 'center');
    const savings = HOUSING_COSTS[centerKey].avg - HOUSING_COSTS[outsideKey].avg;
    suggestions.push(`Consider housing outside George Town center to save ${formatCurrency(Math.round(savings))}/month`);
  }

  // Transportation suggestions
  if (currentInputs.transportationType === 'car' || currentInputs.transportationType === 'both') {
    const carSavings = TRANSPORTATION_COSTS.total_car.avg - TRANSPORTATION_COSTS.public_transport.avg;
    suggestions.push(`Switch to public transportation to save ${formatCurrency(Math.round(carSavings))}/month`);
  }

  // Dining suggestions
  if (currentInputs.diningFrequency === 'frequent' || currentInputs.diningFrequency === 'regular') {
    suggestions.push(`Reduce dining out frequency to save CI$200-400/month`);
  }

  // Entertainment suggestions
  if (currentInputs.entertainmentLevel === 'active') {
    suggestions.push(`Reduce entertainment expenses to save CI$100-200/month`);
  }

  return suggestions;
}
