import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigateTo = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    navigateTo("/");
    setUser(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,  
        logout, 
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
