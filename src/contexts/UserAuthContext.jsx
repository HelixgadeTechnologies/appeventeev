import { createContext, useState, useEffect } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext(null);

const UserAuthProvider = ({ children }) => {


  // State to hold token and user details
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userDetails, setUserDetails] = useState(() => {
    const storedDetails = sessionStorage.getItem("userDetails");
    return storedDetails ? JSON.parse(storedDetails) : null;
  });
  console.log(userDetails);
  
  const [isVerified, setIsVerified] = useState(false); // User verification status
  const [userId, setUserId ] = useState(null)

  console.log(token);
  
  // UseEffect to update localStorage with token if available
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Logout function
  const logout = () => {
    setToken(""); // Clear token
    setUserDetails(null); // Clear user details
    setIsVerified(false); // Reset verification status
    localStorage.removeItem("token"); // Remove token from localStorage
    sessionStorage.removeItem('userDetails'); // Remove user details from sessionStorage
  };

  // Sign-up or sign-in success handler (update token and user details)
  const handleAuthSuccess = (token, userDetails) => {
    setToken(token);
    setUserDetails(userDetails);
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails)); // Persist user details in sessionStorage
    localStorage.setItem("token", token); // Persist token in localStorage
  };

  
  

  return (
    <UserAuthContext.Provider
      value={{
        token,
        setToken,
        userDetails,
        setUserDetails,
        isVerified,
        setIsVerified,
        logout,
        userId, setUserId,
        handleAuthSuccess, // A method to call for sign-in or sign-up success
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
