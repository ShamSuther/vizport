import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function UserCheck() {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await fetch("http://localhost:5050/api/user", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    fetchData();
  }, [getToken]);

  return null; // or some loading UI if needed
}