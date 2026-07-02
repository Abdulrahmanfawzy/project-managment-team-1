import { login } from "@/features/Auth/API/auth.api";
import { useMutation } from "@tanstack/react-query";
export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (data)=>{
            console.log(data);
        }
    });
};