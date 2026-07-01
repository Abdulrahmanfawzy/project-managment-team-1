import api from "@/lib/axios"; 

export const askAI = async (question:string) => {
  const { data } = await api.post("/ai/ask", {
    question,
  });

  return data;
};