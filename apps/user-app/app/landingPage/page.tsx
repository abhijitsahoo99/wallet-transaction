import React from "react";
import Image from "next/image";
import Link from "next/link";
import landingPage from "../../public/assets/landingpage.jpeg";
function landingpage() {
  return (
    <div className="flex justify-around">
      <div className="flex flex-col justify-center h-screen px-10 gap-2">
        <p className="text-8xl"> Fast, safe</p>
        <p className="text-8xl">social payment</p>
        <div >
        <p className="text-lg">Pay, get paid, grow a business, and more</p>
        <p className="text-lg">
          Join the tens of millions of people on WalletX
        </p>
        </div>
        <div className="mt-4 border-1 bg-[rgb(96,165,250)] p-2 rounded-lg text-white text-center">
          <Link href="/signup">
          <button> Get WalletX</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Image src={landingPage} alt="Picture of the author" />
      </div>
    </div>
  );
}

export default landingpage;
