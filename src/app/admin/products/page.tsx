import ProductTable from "@/app/admin/products/components/ProductsTable";
import { Suspense } from "react";
import Search from "@/components/common/Search";
import TableSkeleton from "@/components/TableSkeleton";
import { PaginationType } from "@/types/types";
import Toast from "@/components/Toast";
import { CreateIcon } from "@/components/icons/Icons";
import Link from "next/link";

export default async function Products({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;

  const search = params?.search || "";
  const errorMessage = params?.error;
  const successMessage = params?.success;
  const pagination: PaginationType = {
    page: Number(params?.page) || 1,
    limit: Number(params?.limit) || 20,
    count: 1,
  };
  const skeletonTableHeaders = ["Naziv proizvoda", "Opis", "Barcode", "Cena", "Akcija"];


  return (
    <>
      <div>
        <h2>Proizvodi</h2>
        <div className="my-2 flex justify-end items-center gap-2">
          <Search placeholder="Pretraga" />
          <Link className="flex items-center gap-2" href="/admin/products/new">
            <h3 className="whitespace-nowrap">Novi proizvod</h3>
            <CreateIcon size={40} />
          </Link>
        </div>
        <Suspense fallback={<TableSkeleton tableHeaders={skeletonTableHeaders} rowsCount={20} />}>
          <ProductTable search={search} pagination={pagination} />
        </Suspense>
      </div>

      {errorMessage && <Toast errorMessage={errorMessage} />}
      {successMessage && <Toast successMessage={successMessage} />}
    </>
  );
}
