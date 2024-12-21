import { AuthUser } from "@/types/types";
import { postUser } from "@/services/api/usersApi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function newUserAction(formData: FormData) {
  "use server";
  const user: Omit<AuthUser, "userId"> = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    UserRoles: {
      roleId: Number(formData.get("roleId")),
      roleName: "", //not neccesary
    },
    Stores: 
      formData.getAll("storesId").map((storeId) => ({
        storeId: storeId,
        storeName: "", //not neccesary
        storeAddress: "",// not neccesary
      })) as any
    
  };

  console.log(user);

  const { user: addedUser, errorMessage } = await postUser(user);
  revalidatePath("/admin/users");
  if (errorMessage) {
    const errorRedirectUrl = `/admin/users?error=${encodeURIComponent(errorMessage)}`;
    redirect(errorRedirectUrl);
  }

  const redirectUrl = `/admin/users?success=${encodeURIComponent(
    `Korisnik ${addedUser.firstName} ${addedUser.lastName} je uspešno dodat!`
  )}`;
  redirect(redirectUrl);
}
