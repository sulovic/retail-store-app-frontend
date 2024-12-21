import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteProduct } from "@/services/api/productsApi";
import { Product } from "@/types/types";

export async function deleteProductAction(product: Product) {
  "use server";
  const { product: deletedProduct, errorMessage } = await deleteProduct(String(product.productId));
  revalidatePath("/admin/products");
  if (errorMessage) {
    const errorRedirectUrl = `/admin/products?error=${encodeURIComponent(
      `Proizvod ${product.productName}: ${errorMessage}`
    )}`;
    redirect(errorRedirectUrl);
  }
  const redirectUrl = `/admin/products?success=${encodeURIComponent(
    `Proizvod ${deletedProduct.productName} je uspešno izbrisan!`
  )}`;
  redirect(redirectUrl);
}
