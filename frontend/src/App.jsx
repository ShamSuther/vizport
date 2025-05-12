import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import { Home, Editor, Error, Project, Dashboard, SignUpPage } from "./pages";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { AnimatePresence } from "motion/react";
import PageWrapper from "./components/PageWrapper";

const AnimateRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
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
        <Route
          path="/sign_up"
          element={
            <PageWrapper>
              <SignUpPage />
            </PageWrapper>
          }
        />
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
  return (
    <Router>
      <AnimateRoutes />
    </Router>
  );
}

export default App;
