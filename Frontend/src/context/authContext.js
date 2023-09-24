import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { loginUser } from "../services/userServices";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (valueLogin , passwordLogin ) => {
     const res = await loginUser(valueLogin , passwordLogin)
     setCurrentUser(res.data.DT);
     
     return (res.data.DT)  
  };

  const logout = async (valueLogin , passwordLogin ) => {
    let hehe = await axios.post('http://localhost:8080/api/v1/logout', { } , { withCredentials: true })
    toast.success(hehe)
    setCurrentUser(null);

  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
