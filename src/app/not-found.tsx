// app/not-found.tsx
import React from "react";
import Link from "next/link";
import background404 from "../../public/ooops404.jpg";

const Page404: React.FC = () => {
  return (
    <div
      className="flex h-screen items-center justify-center bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background404.src})` }}
    >
      <div className="text-center">
        <h2 className="bg-slate-100 opacity-90 dark:bg-slate-700">404 - UPS, malo smo zalutali...</h2>
        <h4 className="bg-slate-100 opacity-90 dark:bg-slate-700">Stranica koju ste tažili više ne postoji</h4>
        <Link href={"/admin"}>
          <h4 className="bg-slate-100 text-sky-500 opacity-90 dark:bg-slate-700">
            Kliknite ovde kako biste se vratili na početak
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
