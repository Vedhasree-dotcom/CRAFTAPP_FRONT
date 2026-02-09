import React, { createContext, useContext, useEffect, useState } from "react";
import api, {setAuthToken} from "../Services/api";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);
export function AuthProvider({children}) {
    const [token, setToken] = useState(() => {
        try{
            return JSON.parse(localStorage.getItem("token"));
        }
        catch{
            return null;
        }
    });

    const [user, setUser] = useState(() => {
        try{
            return JSON.parse(localStorage.getItem("user"))
        }
        catch{
            return null;
        }
    });

    const [pendingEmail, setPendingEmail] = useState(null);
    const [loading, setLoading] = useState(true);


    const decodeToken = (token) => {
        try{
            return jwtDecode(token);
        }
        catch{
            return null;
        }
    };


    useEffect(() => {
        setAuthToken(token);
        if(token) {
            const decoded = decodeToken(token);
            const payloadUser = decoded?.user || decoded || null;
            setUser(payloadUser);
            localStorage.setItem("user", JSON.stringify(payloadUser));
        } else {
            setUser(null);
            localStorage.removeItem("user");
        }
        setLoading(false); 

    }, [token]);

    
    const register = async (form) => {
        return await api.post("/auth/register", form);
    };

    const login = async (form) => {
        const res = await api.post("/auth/login", form);
        setPendingEmail(form.email);  
        return res;
    };
   
    const verifyOTP = async(email, otp) => {
        const res = await api.post("/auth/verify-otp", { email, otp });
        if(res?.data?.accessToken) {
            setToken(res.data.accessToken);  
            localStorage.setItem("token", JSON.stringify(res.data.accessToken));
            setPendingEmail(null);
        };
        return res;
    };

   const forgotPassword = async (email) => {
     const res = await api.post("/auth/forgot-password", { email });
     setPendingEmail(email); 
     return res;
    };


    const logout = () => {
    api.post("/auth/logout").catch(() => {});
    setToken(null);
    setUser(null);
    setPendingEmail(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (e) {
      console.warn("AuthContext.logout: failed to clear storage", e);
    }
    setAuthToken(null);
  };


    return (
        <AuthContext.Provider 
        value={{token, user, pendingEmail, loading, register, login, verifyOTP, forgotPassword, logout}}
        >
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}