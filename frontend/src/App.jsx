import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import { Home, Editor, Error, Project, Dashboard } from "./pages";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { AnimatePresence } from "motion/react";
import PageWrapper from "./components/PageWrapper";

const AnimateRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route
          path="/dashboard"
          element={
            <>
              <PageWrapper>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </PageWrapper>
            </>
          }
        />
        <Route
          path="/editor"
          element={
            <>
              <PageWrapper>
                <SignedIn>
                  <Editor />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </PageWrapper>
            </>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PageWrapper>
              <Project />
            </PageWrapper>
          }
        />
        {/* <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Register />} /> */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <Error />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};


// main
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
      <AnimateRoutes />
    </Router>
  );
}

export default App;
