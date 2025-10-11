import apiClient from "./client";
import { Job, JobSearchParams } from "@/types/job";
import { ApiResponse, PaginatedResponse } from "@/types/api";

export const jobsApi = {
  // Get all jobs with optional filters
  async getJobs(params?: JobSearchParams): Promise<PaginatedResponse<Job>> {
    const response = await apiClient.get<PaginatedResponse<Job>>("/jobs", { params });
    return response.data;
  },

  // Get a single job by ID
  async getJob(id: string): Promise<Job> {
    const response = await apiClient.get<ApiResponse<Job>>(`/jobs/${id}`);
    return response.data.data;
  },

  // Search jobs
  async searchJobs(query: string, params?: JobSearchParams): Promise<PaginatedResponse<Job>> {
    const response = await apiClient.get<PaginatedResponse<Job>>("/jobs/search", {
      params: { q: query, ...params },
    });
    return response.data;
  },
};
