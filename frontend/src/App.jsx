import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home, Editor, Error, Project, Register } from "./pages";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await fetch("http://localhost:5050/api/user/sync", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        let result;
        if (response.ok && response.status == 200) {
          result = await response.json();
          console.log(result);
        } else if (response.status == 500) {
          result = await response.json();
          console.log(result);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    fetchData();
  }, [getToken]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/editor"
          element={
            <>
              <SignedIn>
                <Editor />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
