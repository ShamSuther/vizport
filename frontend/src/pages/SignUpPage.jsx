import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  // const { signUp } = useSignUp();
  return <SignUp afterSignOutUrl="/" />;
};

export default SignUpPage;
