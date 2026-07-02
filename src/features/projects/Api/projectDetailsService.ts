import apiClient from "@/services/ApiClient";
import type { GetProjectDetailsResponse } from "./projectsdetailsTypes";

const ProjectDetailsService = {
  getById: (id: string): Promise<GetProjectDetailsResponse> =>
    apiClient.get<GetProjectDetailsResponse>(`/projects/${id}`),
};

export default ProjectDetailsService;