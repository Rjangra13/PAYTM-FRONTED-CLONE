import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
// Temporarily using h2 for SubHeading
// import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Error signing in. Please check your credentials and try again.");
    }
  };
  
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
          <Heading label="Sign in" />
          {/* Temporarily using h2 for SubHeading */}
          <h2 className="text-lg font-semibold mb-2">Enter your credentials to access your account</h2>
          <InputBox
            placeholder="Rahul.jangra@gmail.com"
            label="Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button onClick={handleSignIn} label="Sign In" />
          </div>
          <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
        </div>
      </div>
    </div>
  );
};
