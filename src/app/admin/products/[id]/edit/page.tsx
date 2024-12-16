import { getProductById, putProduct } from "@/services/api/productApi";
import { Product } from "@/types/types";
import EditProductForm from "@/app/admin/products/components/forms/EditProductForm";
import Toast from "@/components/Toast";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function editProductAction(formData: FormData) {
  "use server";
  const editedProduct: Product = {
    productId: parseInt(formData.get("productId") as string),
    productName: formData.get("productName") as string,
    productDesc: formData.get("productDesc") as string,
    productPrice: parseFloat(formData.get("productPrice") as string),
    productBarcode: formData.get("productBarcode") as string,
    productImage: "", //Todo
  };

  const { product: addedProduct, errorMessage } = await putProduct(editedProduct);
  revalidatePath("/admin/products");
  if (errorMessage) {
    const errorRedirectUrl = `/admin/products?error=${encodeURIComponent(errorMessage)}`;
    redirect(errorRedirectUrl);
  }
  const redirectUrl = `/admin/products?success=${encodeURIComponent(
    `Proizvod ${addedProduct.productName} je uspešno izmenjen!`
  )}`;
  redirect(redirectUrl);
}

export default async function EditProductModal({ params }: { params: Promise<any> }) {

  const { id } = await params;

  const { product, errorMessage }: { product: Product; errorMessage: string | null } = await getProductById(id);

  return (
    <div>
      <EditProductForm product={product} editProductAction={editProductAction} />
      {errorMessage && <Toast errorMessage={errorMessage} />}
    </div>
  );
}
