import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logInputValues = () => {
    console.log("First Name:", firstname);
    console.log("Last Name:", lastname);
    console.log("Email:", username);
    console.log("Password:", password);
  };

    return <div className="bg-gray-300 h-screen flex justify-center items-center">
         <div className="bg-white p-2 h-max px-4 rounded-lg w-80 text-center shadow-md border border-black border-solid">
            <Heading label = {"Sign Up"}  />
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox onChange = {(e) => {
              setFirstname(e.target.value)
              logInputValues();
            }}
            placeholder="John" label={"First Name"} />
            <InputBox onChange = {(e) => {
              setLastname(e.target.value)
              logInputValues();
            }}
            placeholder="Doe" label={"Last Name"} />
            <InputBox onChange = {(e) => {
              setUsername(e.target.value)
              logInputValues();
            }}
            placeholder="Email" label={"Email"} />
            <InputBox onChange = {(e) => (
              setPassword(e.target.value)
              // logInputValues();
            )}
            placeholder="Password" label={"Password"} />

            <Button onClick= { async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                firstname,
                lastname,
                username,
                password
              });
              localStorage.setItem("token" , response.data.token)
              navigate("/dashboard")
            }}
            placeholder="Sign Up" />
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
  </div>
}