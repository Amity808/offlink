import api from "./axiosfetch"
import { toast } from "react-toastify"

export const sendEmailVerifcation = async (userEmail) => {
    try {
        const sendVerification = api.post("/auth/resend-confirmation-email/", userEmail)
        const isSent = await sendVerification;
        toast.success("Check your email for verification")
        console.log(isSent)
    } catch (err) {
        toast.error(err.message)
        
    }
}

// accessToken


export const loginUser = async (loginData) => {
    try {
        const response = api.post("/auth/login", loginData)
        const result = await response;
        return result;
        
    } catch (error) {
        
    }
}