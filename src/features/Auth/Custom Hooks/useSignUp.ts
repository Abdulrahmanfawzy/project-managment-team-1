import {signup} from "../API/auth.api"
import {useMutation} from "@tanstack/react-query"
import axios from "axios";
export const useSignUp = () => {
    return useMutation({
        mutationFn: signup,
        onSuccess: (data)=>{
            console.log(data);
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.error("[SignUp 422 Error] Server response:", error.response?.data);
            }
        }
    })
}