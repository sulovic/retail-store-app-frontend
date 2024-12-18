import { AuthUser, PaginationType } from "@/types/types";
import Link from "next/link";
import { DeleteIcon, EditIcon, SearchIcon } from "@/components/icons/Icons";
import Pagination from "@/components/common/Pagination";
import { getUsers, getUsersCount } from "@/services/api/usersApi";
import Toast from "@/components/Toast";

const UsersTable: React.FC<{ search: string; pagination: PaginationType }> = async ({ search, pagination }) => {
  const tableHeaders = ["Ime i prezime", "Email/Username", "Ovlašćenja", "Prodavnice", "Akcija"];

  let { users, errorMessage: usersErrorMessage }: { users: AuthUser[]; errorMessage: string | null } =
    await getUsers({ search, pagination });

  let { count: totalUsers, errorMessage: countErrorMessage }: { count: number; errorMessage: string | null } =
    await getUsersCount({ search });

  pagination.count = totalUsers || 1;

  return (
    <>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((tableKey, index) => (
              <th key={index}>{tableKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="overflow-hidden text-ellipsis text-left" >
                {user?.firstName} {user?.lastName}
              </td>
              <td className="overflow-hidden text-ellipsis text-left" >
                {user?.email}
              </td>
              <td >{user?.UserRoles.roleName}</td>
              <td className="overflow-hidden text-ellipsis text-left" >
                {user?.Stores?.map((store) => store.storeName).join(", ")}
              </td>

              <td className="flex justify-end gap-4" key={`action_${index}`}>
                <Link href={`/admin/users/${user?.userId}`}>
                  <SearchIcon size={40} />
                </Link>
                <Link href={`/admin/users/${user?.userId}/delete`}>
                  <DeleteIcon size={40} />
                </Link>
                <Link href={`/admin/users/${user?.userId}/edit`}>
                  <EditIcon size={40} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-2 flex justify-end items-center gap-2 md:my-4">
        <Pagination pagination={pagination} />
      </div>
      {usersErrorMessage && <Toast errorMessage={usersErrorMessage} />}
      {countErrorMessage && <Toast errorMessage={countErrorMessage} />}
    </>
  );
};

export default UsersTable;
