import { AuthUser } from "@/types/types";
import { getUserById, deleteUser } from "@/services/api/usersApi";
import Toast from "@/components/Toast";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Form from "next/form";
import Link from "next/link";
import SubmitActionButton from "@/components/buttons/SubmitActionButton";

async function deleteUserAction(formData: FormData) {
  "use server";

  const userId = formData.get("userId")?.toString() || "";
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";

  const { user: deletedUser, errorMessage } = await deleteUser(userId);
  revalidatePath("/admin/users");
  if (errorMessage) {
    const errorRedirectUrl = `/admin/products?error=${encodeURIComponent(
      `Korisnik ${firstName} ${lastName}: ${errorMessage}`
    )}`;
    redirect(errorRedirectUrl);
  }
  const redirectUrl = `/admin/products?success=${encodeURIComponent(
    `Korisnik ${deletedUser.firstName} ${deletedUser.lastName} je uspešno izbrisan!`
  )}`;
  redirect(redirectUrl);
}

const DeleteUser: React.FC<{ id: string }> = async ({ id }) => {
  const { user, errorMessage }: { user: AuthUser; errorMessage: string | null } = await getUserById(id);

  return (
    <div className="flex flex-col gap-4">
      <div className="m-4 p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
        <div className="w-full sm:mt-0 text-left">
          {/* Modal Head */}
          <h4 className="p-0">Brisanje korisnika</h4>
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
        <div className="gap-2 flex justify-end">
          <Link href="/admin/users" className="button button-gray">
            Odustani
          </Link>
          <SubmitActionButton
            action={deleteUserAction}
            actionProps={user}
            option="danger"
            buttonText="Obriši korisnika"
          />
        </div>
        {errorMessage && <Toast errorMessage={errorMessage} />}
      </div>
    </div>
  );
};

export default DeleteUser;
