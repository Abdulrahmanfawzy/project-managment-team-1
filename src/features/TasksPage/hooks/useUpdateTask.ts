import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks.api";
import { taskKeys } from "./tasksKeys";
import type { TasksResponse, UpdateTaskPayload } from "../types/tasks";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskPayload }) =>
      tasksApi.update(id, data),

    // Optimistic update: patch the cached task list immediately so the UI
    // (e.g. a dragged kanban card) reflects the change before the server
    // responds. Rolled back in onError if the request fails.
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const previous = queryClient.getQueriesData<TasksResponse>({
        queryKey: taskKeys.lists(),
      });

      queryClient.setQueriesData<TasksResponse>(
        { queryKey: taskKeys.lists() },
        (old) =>
          old
            ? {
                ...old,
                data: old.data.map((task) =>
                  task.id === id
                    ? {
                        ...task,
                        status: data.status,
                        title: data.title,
                        priority: data.priority,
                        start_date: data.start_date,
                        description: data.description ?? task.description,
                      }
                    : task,
                ),
              }
            : old,
      );

      return { previous };
    },

    // Restore the pre-mutation snapshot if the server rejects the change.
    onError: (_err, _variables, context) => {
      context?.previous.forEach(([key, value]) =>
        queryClient.setQueryData(key, value),
      );
    },

    // Whether it succeeded or failed, resync with the server as the source
    // of truth.
    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
}

//data is res
//variables which task updated
