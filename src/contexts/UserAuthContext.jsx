import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {
  // Load from localStorage or set default values
  const [userDetails, setUserDetails] = useState(() => {
    try {
        const storedUser = localStorage.getItem("userDetails");
        return storedUser ? JSON.parse(storedUser) : {};
    } catch (error) {
        console.error("Error parsing userDetails:", error);
        return {};
    }
});


  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || "";
  });

  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem("isVerified") === "true"; // Convert string to boolean
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("userId", userId);
    localStorage.setItem("isVerified", isVerified.toString());
  }, [userDetails, userId, isVerified]);

  return (
    <UserAuthContext.Provider value={{ userDetails, setUserDetails, isVerified, setIsVerified, userId, setUserId }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
