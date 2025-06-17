'use client'
import { useState } from "react";

import LandingPage from "./_component/LandingPage";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-[1920px] mx-auto">
        <LandingPage />
      </div>
    </main>
  );
}