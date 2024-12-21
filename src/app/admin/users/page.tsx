import UsersTable from "./components/UsersTable";
import { Suspense } from "react";
import Search from "@/components/common/Search";
import TableSkeleton from "@/components/TableSkeleton";
import { PaginationType } from "@/types/types";
import Toast from "@/components/Toast";
import { CreateIcon } from "@/components/Icons";
import Link from "next/link";

export default async function Users({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const { error, success, search = "", page = 1, limit = 20 } = params;
  const pagination: PaginationType = {
    page: Number(page),
    limit: Number(limit),
    count: 1,
  };
  console.log(search);
  const skeletonTableHeaders = ["Ime i prezime", "Email/Username", "Ovlašćenja", "Prodavnice", "Akcija"];

  return (
    <>
      <div>
        <h2>Korisnici</h2>
        <div className="my-2 flex justify-end items-center gap-2">
          <Search placeholder="Pretraga" />
          <Link className="flex items-center gap-2" href="/admin/users/new">
            <h3 className="whitespace-nowrap">Novi korisnik</h3>
            <CreateIcon size={40} />
          </Link>
        </div>
        <Suspense fallback={<TableSkeleton tableHeaders={skeletonTableHeaders} rowsCount={5} />}>
          <UsersTable search={search} pagination={pagination} />
        </Suspense>
      </div>

      {error && <Toast errorMessage={error} />}
      {success && <Toast successMessage={success} />}
    </>
  );
}
