import apiClient from "@/services/ApiClient";
import type { GetProjectsResponse } from "./Projectstypes";
import type {
  CreateProjectPayload,
  CreateProjectResponse,
} from "./createProject.types";
import type {
  UpdateProjectPayload,
  UpdateProjectResponse,
} from "./updateProject.types";

const ProjectsService = {
  getAll: (): Promise<GetProjectsResponse> =>
    apiClient.get<GetProjectsResponse>("/projects"),

  create: (payload: CreateProjectPayload): Promise<CreateProjectResponse> =>
    apiClient.post<CreateProjectResponse>("/projects", payload),

  update: (
    id: string,
    payload: UpdateProjectPayload,
  ): Promise<UpdateProjectResponse> =>
    apiClient.put<UpdateProjectResponse>(`/projects/${id}`, payload),

  delete: (id: string): Promise<void> =>
    apiClient.delete<void>(`/projects/${id}`),
};

export default ProjectsService;