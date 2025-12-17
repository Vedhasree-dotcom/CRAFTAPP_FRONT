import React, {useEffect, useState } from "react"
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";


export default function Register() {
    const [form, setForm] = useState({name: "", email: "", password: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {register, user, token, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && (token || user)) {
             navigate("/login")
        }
    }, [loading, token, user, navigate]);


    useEffect(() => {
        if (!loading && (token || user)) {
          navigate("/");
        }
      }, [loading, token, user, navigate]);
    
      const validate = () => {
        const errs = {};
        if (!form.email) errs.email = "Email is required";
        else if (!form.email.includes("@")) errs.email = "Invalid email";
    
        if (!form.password) errs.password = "Password is required";
        else if (form.password.length < 6)
          errs.password = "Password must be at least 6 characters";
    
        return errs;
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); 

        try{
        const res = await register(form);
        alert(res.data.message);
        }
        catch (err) {
            alert(err?.response?.data?.message || err.message);
        }
    };

     return(
        <div className="register">
            <form onSubmit={handleSubmit} className="form d-flex flex-column gap-2 ">
                <h3 className="text-center">Create an Account</h3>
                <input 
                className="form-control"
                name="name"
                placeholder="Name"
                onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.
                value }))}
                />

                <input 
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.
                value }))}
                />

                 {submitted && validate().email && (
          <div className="text-danger small">{validate().email}</div>
        )}

                <div className="password-wrapper">
                          <input
                            className="form-control"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, password: e.target.value }))
                            }
                          />
                
                          <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>

         {submitted && validate().password && (
          <div className="text-danger small">{validate().password}</div>
        )}

                <input 
                className="form-control"
                name="phone"
                placeholder="Phone"
                onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.
                value }))}
                />

                <button  type="submit" className="signup">Submit</button>
                <span> Already have an account? 
                <Link to="/login" 
                    style={{ 
                         color: "chocolate",
                         textDecoration: "none",
                          fontWeight: "500",
                          marginTop: "10px",
                          paddingLeft: "10px"
                        
                    }}>
               Sign In</Link>
                </span>

            </form>
        </div>
     )



}