import React from "react";
import Image from "next/image";
import landingPage from "../../public/assets/landingpage.jpeg";
function page() {
  return (
    <div className="flex justify-around">
      <div className="flex flex-col justify-center h-screen px-10">
        <p className="text-8xl"> Fast, safe</p>
        <p className="text-8xl">social payment</p>
        <p className="text-lg">Pay, get paid, grow a business, and more</p>
        <p className="text-lg">
          Join the tens of millions of people on WalletX
        </p>
        <div className="mt-4 border-1 bg-[rgb(96,165,250)] p-2 rounded-lg text-white text-center">
          <button> Get WalletX</button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Image src={landingPage} alt="Picture of the author" />
      </div>
    </div>
  );
}

export default page;
