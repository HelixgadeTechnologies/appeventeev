import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {
  // Load userId from localStorage
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");

  const [token, setToken ] = useState(() => localStorage.getItem("token") || "")

  

  // Keep user details and verification status in memory (not localStorage)
  const [userDetails, setUserDetails] = useState({});
  const [isVerified, setIsVerified] = useState(false);







  // Update localStorage when userId changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("userId"); // Remove when logged out
    }
  }, [userId]);

  return (
    <UserAuthContext.Provider value={{ userDetails, setUserDetails, isVerified, setIsVerified, userId, setUserId, token, setToken }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
