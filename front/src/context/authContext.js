import { createContext,useEffect,useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children})=> {
    const [currentuser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data);
      };
    
      const logout = async (inputs) => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
      };
      

    useEffect(()=> {
        localStorage.setItem('user',JSON.stringify(currentuser));
    },[currentuser])  

    return (
        <AuthContext.Provider value={{ currentuser, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    
}