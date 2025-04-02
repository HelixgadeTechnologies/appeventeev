import { createContext, useState, useEffect } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {


  // Load data from localStorage
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [resetToken, setResetToken] = useState(() => localStorage.getItem("resetToken") || "");
  
  
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("userDetails");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [isVerified, setIsVerified] = useState(false);

  // Update localStorage when userId, token, resetToken, or userDetails change
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      localStorage.setItem("resetToken", resetToken);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails"); // Remove on logout
      localStorage.removeItem("resetToken");
    }
  }, [userId, token, userDetails]);

  const logout = () => {
    setUserId("");
    setToken("");
    setUserDetails({});
    setIsVerified(false);
  
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
  };
  

  return (
    <UserAuthContext.Provider value={{ 
      userDetails, setUserDetails, 
      isVerified, setIsVerified, 
      userId, setUserId, 
      token, setToken,
      logout, setResetToken, resetToken
    }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
