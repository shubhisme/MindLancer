import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import FiverrLogo from "../FiverrLogo";

function FiverrBusiness() {
  return (
    <div className="bg-blue-800 px-20 py-16 flex gap-10">
      <div className="text-white flex flex-col gap-6 justify-center items-start">
        <div className="flex gap-2">
          <span className="text-white text-6xl font-bold"> Our Business</span>
        </div>
        <h2 className="text-3xl font-bold">A solution built for business</h2>
        <h4 className="text-xl">
          Upgrade to a curated experience to access vetted talent and exclusive
          tools
        </h4>
        <ul className="flex flex-col gap-4">
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-white text-2xl" />
            <span>Talent matching</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-[#fff] text-2xl" />
            <span>Dedicated account management</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-[#fff] text-2xl" />
            <span>Team collaboration tools</span>
          </li>
          <li className="flex gap-2 items-center">
            <BsCheckCircle className="text-[#fff] text-2xl" />
            <span>Business payment solutions</span>
          </li>
        </ul>
        <button
          className="border text-base font-medium px-5 py-2   border-blue-400 bg-blue-400 text-white rounded-md hover:border-amber-300 hover:bg-amber-300 transition-all"
          type="button"
        >
          Explore Our Business
        </button>
      </div>
      <div className="relative h-[512px] w-2/3">
        <Image src="/business.webp" alt="bsiness" fill />
      </div>
    </div>
  );
}

export default FiverrBusiness;