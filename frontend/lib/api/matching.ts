import apiClient from "./client";
import { CareerMatch, CareerPathway } from "@/types/career";
import { ApiResponse } from "@/types/api";

export const matchingApi = {
  // Get career matches for a profile
  async getMatches(profileId: string, limit?: number): Promise<CareerMatch[]> {
    const response = await apiClient.post<ApiResponse<CareerMatch[]>>("/matching", {
      profile_id: profileId,
      limit: limit || 20,
    });
    return response.data.data;
  },

  // Get career pathway for a specific job
  async getCareerPathway(jobId: string, profileId?: string): Promise<CareerPathway> {
    const response = await apiClient.get<ApiResponse<CareerPathway>>("/career-pathways", {
      params: { job_id: jobId, profile_id: profileId },
    });
    return response.data.data;
  },
};
