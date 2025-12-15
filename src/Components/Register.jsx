import React, {useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";


export default function Register() {
    const [form, setForm] = useState({name: "", email: "", password: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);
    const {register, user, token, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && (token || user)) {
             navigate("/")
        }
    }, [loading, token, user, navigate]);


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
        <div>
            <form onSubmit={handleSubmit} className="form d-flex flex-column gap-2 ">
                <h1 className="text-center">Register</h1>
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

                <input
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.
                value }))}
                />

                <input 
                className="form-control"
                name="phone"
                placeholder="Phone"
                onChange={(e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.
                value }))}
                />

                <button  type="submit">Submit</button>

            </form>
        </div>
     )



}