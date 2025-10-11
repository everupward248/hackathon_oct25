import apiClient from "./client";
import { LifestyleProfile, LifestyleAssessmentData } from "@/types/lifestyle";
import { ApiResponse } from "@/types/api";

export const profilesApi = {
  // Create a new lifestyle profile
  async createProfile(data: LifestyleAssessmentData): Promise<LifestyleProfile> {
    const response = await apiClient.post<ApiResponse<LifestyleProfile>>("/profiles", data);
    return response.data.data;
  },

  // Get a profile by ID
  async getProfile(id: string): Promise<LifestyleProfile> {
    const response = await apiClient.get<ApiResponse<LifestyleProfile>>(`/profiles/${id}`);
    return response.data.data;
  },

  // Update a profile
  async updateProfile(id: string, data: Partial<LifestyleAssessmentData>): Promise<LifestyleProfile> {
    const response = await apiClient.put<ApiResponse<LifestyleProfile>>(`/profiles/${id}`, data);
    return response.data.data;
  },
};
