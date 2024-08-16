import Link from "next/link";
import React from "react";

function signin() {
  return (
    <div className="flex justify-around items-center h-screen">
      <div>
        <p className="text-5xl text-[rgb(96,165,250)]">Welcome to WalletX</p>
      </div>
      <div>
        <p className="text-center pb-2 text-[rgb(96,165,250)] text-3xl">
          Create an account
        </p>
        <div className="border-2 rounded-3xl p-8 flex flex-col">
          <div className="flex flex-col my-1 gap-1">
            <label className="text-[rgb(96,165,250)]">Phone</label>
            <input
              type="text"
              className="border-2 rounded-xl pl-2 pr-22 py-1 placeholder-gray-500"
              placeholder="Enter your phone number"
            ></input>
          </div>
          <div className="flex flex-col my-1 gap-1">
            <label className="text-[rgb(96,165,250)]">Password</label>
            <input
              type="text"
              className="border-2 rounded-xl pl-2 pr-24 py-1  placeholder-gray-500"
              placeholder="Enter your password"
            ></input>
          </div>
          <div className=" border-1 bg-[rgb(96,165,250)] rounded-xl mt-4 px-2 py-2 text-white text-center ">
            <button>Sign Up</button>
          </div>
        </div>
        <p className=" text-[rgb(96,165,250)] text-center mt-2 ">
          Already have an account? <Link href="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default signin;
