import api from "./axiosfetch"
import { toast } from "react-toastify"

// import { useclient}
// const userToken = localStorage.getItem('bih')
let userToken
if(typeof window !== "undefined") {
    userToken = localStorage.getItem('bih')

  }

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
        const response = api.post("/auth/login", loginData, {
            headers: {
                'Content-Type': "application/json"
            }
        })
        const result = await response;
        return result;
        
    } catch (error) {
        
    }
}

export const getProfile = async () => {
        try {
            const response = api.get("/auth/user-profile", 
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${userToken}`
                }
                
              })
            const result = await response;
            console.log(result)
            return result;
        } catch (error) {
            console.log(error)
        }
    
}
export const newProfileUpdate = async (profileData) => {
        try {
            const response = api.put("/auth/user-profile", profileData, 
            {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userToken}`
                }
                
              })
            const result = await response;
            console.log(result)
            return result;
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    
}