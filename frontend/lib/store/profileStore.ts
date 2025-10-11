import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { LifestyleProfile } from '../algorithms/matching';
import type { LifestyleInputs, LifestyleCostResult } from '../calculators/lifestyle';
import type { ScoredJob } from '../algorithms/matching';

export interface AssessmentStep {
  housing: {
    bedrooms: number;
    housingLocation: 'center' | 'outside';
  } | null;
  lifestyle: {
    familySize: number;
    numChildren: number;
    childcareType?: 'daycare' | 'preschool' | 'afterschool' | 'none';
    transportationType: 'car' | 'public' | 'both';
    groceryLevel: 'basic' | 'moderate' | 'premium';
    diningFrequency: 'occasional' | 'regular' | 'frequent';
    entertainmentLevel: 'minimal' | 'moderate' | 'active';
    hasGym?: boolean;
    savingsGoal: 'minimal' | 'moderate' | 'aggressive';
  } | null;
  careerPreferences: {
    preferredLocations: string[];
    currentEducationLevel: string;
    yearsOfExperience: string;
    preferredIndustries?: string[];
    priorities?: {
      salary: number;
      location: number;
      workLifeBalance: number;
    };
  } | null;
}

export interface ProfileState {
  // Current assessment in progress
  currentStep: number;
  assessmentData: AssessmentStep;

  // Calculated results
  lifestyleCost: LifestyleCostResult | null;
  lifestyleProfile: LifestyleProfile | null;
  matchedJobs: ScoredJob[];

  // Saved profiles
  savedProfiles: SavedProfile[];
  activeProfileId: string | null;

  // Actions
  setCurrentStep: (step: number) => void;
  updateHousingData: (data: AssessmentStep['housing']) => void;
  updateLifestyleData: (data: AssessmentStep['lifestyle']) => void;
  updateCareerPreferences: (data: AssessmentStep['careerPreferences']) => void;
  setLifestyleCost: (cost: LifestyleCostResult) => void;
  setLifestyleProfile: (profile: LifestyleProfile) => void;
  setMatchedJobs: (jobs: ScoredJob[]) => void;
  saveProfile: (name: string) => void;
  loadProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
  resetAssessment: () => void;
}

export interface SavedProfile {
  id: string;
  name: string;
  createdAt: string;
  assessmentData: AssessmentStep;
  lifestyleCost: LifestyleCostResult;
  lifestyleProfile: LifestyleProfile;
  matchedJobs: ScoredJob[];
}

const initialAssessmentData: AssessmentStep = {
  housing: null,
  lifestyle: null,
  careerPreferences: null,
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 0,
      assessmentData: initialAssessmentData,
      lifestyleCost: null,
      lifestyleProfile: null,
      matchedJobs: [],
      savedProfiles: [],
      activeProfileId: null,

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),

      updateHousingData: (data) =>
        set((state) => ({
          assessmentData: {
            ...state.assessmentData,
            housing: data,
          },
        })),

      updateLifestyleData: (data) =>
        set((state) => ({
          assessmentData: {
            ...state.assessmentData,
            lifestyle: data,
          },
        })),

      updateCareerPreferences: (data) =>
        set((state) => ({
          assessmentData: {
            ...state.assessmentData,
            careerPreferences: data,
          },
        })),

      setLifestyleCost: (cost) => set({ lifestyleCost: cost }),

      setLifestyleProfile: (profile) => set({ lifestyleProfile: profile }),

      setMatchedJobs: (jobs) => set({ matchedJobs: jobs }),

      saveProfile: (name) => {
        const state = get();

        // Validate that we have all required data
        if (!state.lifestyleCost || !state.lifestyleProfile || state.matchedJobs.length === 0) {
          console.error('Cannot save profile: missing required data');
          return;
        }

        const newProfile: SavedProfile = {
          id: `profile-${Date.now()}`,
          name,
          createdAt: new Date().toISOString(),
          assessmentData: state.assessmentData,
          lifestyleCost: state.lifestyleCost,
          lifestyleProfile: state.lifestyleProfile,
          matchedJobs: state.matchedJobs,
        };

        set((state) => ({
          savedProfiles: [...state.savedProfiles, newProfile],
          activeProfileId: newProfile.id,
        }));
      },

      loadProfile: (id) => {
        const state = get();
        const profile = state.savedProfiles.find((p) => p.id === id);

        if (!profile) {
          console.error(`Profile with id ${id} not found`);
          return;
        }

        set({
          activeProfileId: id,
          assessmentData: profile.assessmentData,
          lifestyleCost: profile.lifestyleCost,
          lifestyleProfile: profile.lifestyleProfile,
          matchedJobs: profile.matchedJobs,
          currentStep: 4, // Jump to results step
        });
      },

      deleteProfile: (id) => {
        set((state) => ({
          savedProfiles: state.savedProfiles.filter((p) => p.id !== id),
          activeProfileId: state.activeProfileId === id ? null : state.activeProfileId,
        }));
      },

      resetAssessment: () => {
        set({
          currentStep: 0,
          assessmentData: initialAssessmentData,
          lifestyleCost: null,
          lifestyleProfile: null,
          matchedJobs: [],
          activeProfileId: null,
        });
      },
    }),
    {
      name: 'cayman-career-profile-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist saved profiles and active profile ID
      partialize: (state) => ({
        savedProfiles: state.savedProfiles,
        activeProfileId: state.activeProfileId,
      }),
    }
  )
);
