import { createContext, useContext, useEffect, useState } from "react";
import { useAuth as clerkAuth } from "@clerk/clerk-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = clerkAuth();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("No token received from Clerk");

        const response = await fetch("http://localhost:5050/api/user/sync", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();

        if (isMounted) {
          if (response.ok) {
            setUser(result.user);
          } else {
            console.warn("Sync failed:", result.message);
            setUser(null);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error during auth sync:", error);
          setUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getToken]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
