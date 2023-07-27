import React from "react";
import Image from 'next/image';
import { useStateProvider } from "@/context/StateContext";

function onboarding() {
  const [{ userInfo }] = useStateProvider();

  return <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
    <div className="flex items-center justify-center gap-2">
      <Image src="/whatsapp.gif" alt='whatsapp' height={300} width={300} />
    </div>
    <h2 className="text-2xl">Create your profile</h2>
    <div className="flex gap-6 mt-6">
      <div className="flex flex-col items-center justify-center mt-5 gap2">
        Hi {userInfo?.name}
      </div>
    </div>
  </div>;
}

export default onboarding;
