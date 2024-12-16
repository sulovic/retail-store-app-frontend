import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/services/apiPublicData";
import { Product } from "@/types/types";
import Toast from "@/components/Toast";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

const Home = async () => {
  await new Promise((test) => setTimeout(test, 3000));
  const { products, errorMessage }: { products: Product[]; errorMessage: string | null } = await getProducts();

  return (
    <div className="w-full h-screen">
      <div className="flex flex-wrap bg-sky-400 p-1 align-middle text-center">
        <Link href={"/"} className="ps-2 flex items-center">
          <Image src={"/favicon.png"} alt="logo" width={40} height={40} />
        </Link>
        <div className="px-4 flex items-center">
          <h4 className="text-white">RETAIL STORE</h4>
        </div>
        <div className="flex grow justify-center ">
          <h3 className="text-white">Proizvodi na akciji</h3>
        </div>
      </div>
      <Suspense>
        <p>{JSON.stringify(products, null, 2)}</p>
      </Suspense>

      {errorMessage && <Toast errorMessage={errorMessage} />}
    </div>
  );
};

export default Home;
