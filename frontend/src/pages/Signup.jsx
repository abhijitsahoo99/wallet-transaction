import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"


export const Signup = () => {
    return <div className="bg-gray-300 h-screen flex justify-center items-center">
         <div className="bg-white p-2 h-max px-4 rounded-lg w-80 text-center shadow-md border border-black border-solid">
            <Heading label = {"Sign Up"}  />
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox placeholder="John" label={"First Name"} />
            <InputBox placeholder="Doe" label={"Last Name"} />
            <InputBox placeholder="Email" label={"Email"} />
            <InputBox placeholder="Password" label={"Password"} />
            <Button placeholder="Sign Up" />
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
  </div>
}