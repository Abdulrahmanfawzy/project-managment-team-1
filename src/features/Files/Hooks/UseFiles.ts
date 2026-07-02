import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../Api/Files";

export const useFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });
};
