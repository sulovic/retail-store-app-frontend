import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postProduct,putProduct, deleteProduct } from "@/services/api/productsApi";
import { Product } from "@/types/types";



export async function newProductAction(formData: FormData) {
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
export async function editProductAction(formData: FormData) {
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
      const errorRedirectUrl = `/admin/products?error=${encodeURIComponent(
        `Proizvod ${editedProduct.productName}: ${errorMessage}`
      )}`;
      redirect(errorRedirectUrl);
    }
    const redirectUrl = `/admin/products?success=${encodeURIComponent(
      `Proizvod ${addedProduct.productName} je uspešno izmenjen!`
    )}`;
    redirect(redirectUrl);
  }

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


