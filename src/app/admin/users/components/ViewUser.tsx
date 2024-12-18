import { AuthUser } from "@/types/types";
import Link from "next/link";
import { getUserById } from "@/services/api/usersApi";
import Toast from "@/components/Toast";

const ViewUser: React.FC<{ id: string }> = async ({ id }) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const { user, errorMessage }: { user: AuthUser; errorMessage: string | null } = await getUserById(id);

  return (
    <div className="m-4 p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
      <div className="w-full sm:mt-0 text-left">
        {/* Modal Head */}
        <h4 className="p-0">Pregled korisnika</h4>
        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
        {/* Modal Body */}
        <div className="my-2">
          <h5>Podaci o korisniku:</h5>
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div>
            <div>
              <label htmlFor="productName">Ime i prezime</label>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <label htmlFor="productDesc">Email</label>
              <p> {user.email}</p>
            </div>
            <div>
              <label htmlFor="productBarcode">Ovlašćenja</label>
              <p>{user.UserRoles.roleName}</p>
            </div>
          </div>
          <div>
            <label htmlFor="productBarcode">Prodavnice</label>

            {user.Stores.map((store, index) => (
              <p key={index}>{store.storeName}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

      {/* Modal Buttons */}
      <div className="gap-2 flex flex-row-reverse">
        <Link href="/admin/users" className="button button-gray">
          Odustani
        </Link>
      </div>
      {errorMessage && <Toast errorMessage={errorMessage} />}
    </div>
  );
};

export default ViewUser;
