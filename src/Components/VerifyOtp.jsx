import React, {useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext";

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const { pendingEmail, user, verifyOTP} = useAuth();
    const location = useLocation(); 
    const email =  location?.state?.email || pendingEmail;
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);

    
    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const res = await verifyOTP(email, otp);
            alert(res.data.message);
            if(res.status === 200) {
                setVerified(true)
            }
        }
        catch(err) {
            alert(err?.response?.data?.message || err.message);
        }
        };
    

    // Redirect after user is updated in Authcontext
    useEffect(() => {
        if(verified && user) {
            if(user.role === "admin") {
                navigate("/admin/dashboard");
            }
            else if (user.role === "user"){
                navigate("/")
             }
             // else{
            //     navigate("/")
            // }
        }
    }, [verified, user, navigate])


   
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} />
            <button type="submit">Verify OTP</button>

        </form>
    )




}
