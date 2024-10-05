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
        const res = await VerfiUser(token); // Await the API response
        if (res && res.data) {
          setAuthenticated(true); // Set authenticated to true if the token is valid
        } else {
          navigate("/"); // Redirect to home if not authenticated
        }
      } catch (error) {
        console.error("Verification failed", error);
        navigate("/"); // Redirect to home if an error occurs
      }
    };

    if (token) {
      verifyRoute();
    } else {
      navigate("/"); // Redirect to home if no token is found
    }
  }, [token, navigate]);

  return authenticated ? <Outlet /> : null; // Render child routes if authenticated
}
