import NewProductForm from "@/app/admin/products/components/forms/NewProductForm";
import { postProduct } from "@/services/api/productApi";
import { Product } from "@/types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function newProductAction(formData: FormData) {
  "use server";
  const product: Omit<Product, "productId" | "productImage"> = {
    productName: formData.get("productName") as string,
    productDesc: formData.get("productDesc") as string,
    productPrice: parseFloat(formData.get("productPrice") as string),
    productBarcode: formData.get("productBarcode") as string,
  };

  const { product: addedProduct, errorMessage } = await postProduct(product);
  revalidatePath("/admin/products");
  if (errorMessage) {
    const errorRedirectUrl = `/admin/products?error=${encodeURIComponent(errorMessage)}`;
    redirect(errorRedirectUrl);
  }

  const redirectUrl = `/admin/products?success=${encodeURIComponent(
    `Proizvod ${addedProduct.productName} je uspešno dodat!`
  )}`;
  redirect(redirectUrl);
}

export default function NewProduct() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <NewProductForm newProcuctAction={newProductAction} />
    </div>
  );
}
