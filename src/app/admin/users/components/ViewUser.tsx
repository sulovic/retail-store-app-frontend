import { AuthUser } from "@/types/types";
import Link from "next/link";
import { getUserById } from "@/services/api/usersApi";
import Toast from "@/components/Toast";

const ViewUser: React.FC<{ id: string }> = async ({ id }) => {
  const { user, errorMessage }: { user: AuthUser; errorMessage: string | null } = await getUserById(id);

  return (
    <div className="flex flex-col gap-4">
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
                <label>Ime i prezime</label>
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <label>Email</label>
                <p> {user.email}</p>
              </div>
              <div>
                <label >Ovlašćenja</label>
                <p>{user && user.UserRoles?.roleName}</p>
              </div>
            </div>
            <div>
              <label>Prodavnice</label>

              {user && user.Stores && user.Stores.map((store, index) => (
                <p key={index}>{store.storeName}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

        {/* Modal Buttons */}
        <div className="gap-2 flex flex-row-reverse">
          <Link href="/admin/users" className="button button-tertiary">
            Odustani
          </Link>
        </div>
        {errorMessage && <Toast errorMessage={errorMessage} />}
      </div>
    </div>
  );
};

export default ViewUser;
