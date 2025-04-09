import { createContext, useState, useEffect } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext(null);

const UserAuthProvider = ({ children }) => {
  // Load from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userDetails, setUserDetails] = useState(() => {
    const storedDetails = localStorage.getItem("userDetails");
    try {
      return storedDetails && storedDetails !== "undefined"
        ? JSON.parse(storedDetails)
        : null;
    } catch (err) {
      console.error("Failed to parse userDetails from localStorage:", err);
      return null;
    }
  });



  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [isVerified, setIsVerified] = useState(false);

  // Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Sync userDetails with localStorage
  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else {
      localStorage.removeItem("userDetails");
    }
  }, [userDetails]);

  // Sync userId with localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  // Logout function
  const logout = () => {
    setToken("");
    setUserDetails(null);
    setUserId(null);
    setIsVerified(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userId");
  };

  // Auth success handler
  const handleAuthSuccess = (token, userDetails) => {
    setToken(token);
    setUserDetails(userDetails);
    setUserId(userDetails?.id || null); // Adjust depending on your actual userDetails structure
  };

  return (
    <UserAuthContext.Provider
      value={{
        token,
        setToken,
        userDetails,
        setUserDetails,
        userId,
        setUserId,
        isVerified,
        setIsVerified,
        logout,
        handleAuthSuccess,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
