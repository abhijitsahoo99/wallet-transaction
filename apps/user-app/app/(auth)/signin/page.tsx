"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

function signin() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const signInHandler = async () => {
    await signIn("credentials", {
      number: phone,
      password: password,
      redirect: false,
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-around items-center h-screen">
      <div>
        <p className="text-5xl text-[rgb(96,165,250)]">Welcome to WalletX</p>
      </div>
      <div>
        <p className="text-center pb-2 text-[rgb(96,165,250)] text-3xl">
          Sign in to your account
        </p>
        <div className="border-2 rounded-3xl p-8 flex flex-col">
          <div className="flex flex-col my-1 gap-1">
            <label className="text-[rgb(96,165,250)]">Phone</label>
            <input
              type="text"
              className="border-2 rounded-xl pl-2 pr-22 py-1 placeholder-gray-500"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col my-1 gap-1">
            <label className="text-[rgb(96,165,250)]">Password</label>
            <input
              type="text"
              className="border-2 rounded-xl pl-2 pr-24 py-1  placeholder-gray-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col my-1  gap-1">
            <label className="text-[rgb(96,165,250)]">OTP</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="border-2 rounded-xl p-2 w-10 "
              ></input>
              <input
                type="text"
                className="border-2 rounded-xl p-2 w-10"
              ></input>
              <input
                type="text"
                className="border-2 rounded-xl p-2 w-10 "
              ></input>
              <input
                type="text"
                className="border-2 rounded-xl p-2 w-10"
              ></input>
            </div>
          </div>
          <div className=" border-1 bg-[rgb(96,165,250)] rounded-xl mt-4 px-2 py-2 text-white text-center ">
            <button onClick={signInHandler}>Sign in</button>
          </div>
        </div>
        <p className=" text-[rgb(96,165,250)] text-center mt-2 ">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default signin;
