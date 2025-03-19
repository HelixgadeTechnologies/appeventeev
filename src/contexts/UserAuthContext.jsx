import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {
  // Load data from localStorage
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("userDetails");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [isVerified, setIsVerified] = useState(false);

  // Update localStorage when userId, token, or userDetails change
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails"); // Remove on logout
    }
  }, [userId, token, userDetails]);

  return (
    <UserAuthContext.Provider value={{ 
      userDetails, setUserDetails, 
      isVerified, setIsVerified, 
      userId, setUserId, 
      token, setToken 
    }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
