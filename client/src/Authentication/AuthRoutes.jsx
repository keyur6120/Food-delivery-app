import React, { useEffect, useState } from 'react';
import { VerfiUser } from '../api/index.js';
import { useNavigate, Outlet } from 'react-router-dom';

export default function AuthRoutes() {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("foodeli-app-token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRoute = async () => {
      try {
        const res = await VerfiUser(token); 
        if (res && res.data) {
          setAuthenticated(true);
        } else {
          navigate("/"); 
        }
      } catch (error) {
        console.error("Verification failed", error);
        navigate("/"); 
      }
    };

    if (token) {
      verifyRoute();
    } else {
      navigate("/"); 
    }
  }, [token, navigate]);

  return authenticated ? <Outlet /> : null;
}
