import { useMutation } from "@tanstack/react-query";
import { askAI } from "@/features/api/AskAI.api";

export const useAskAI = () => {
  return useMutation({
    mutationFn: askAI,
   
  });
};