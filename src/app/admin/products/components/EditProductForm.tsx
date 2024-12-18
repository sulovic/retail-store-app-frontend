import Form from "next/form"; // Make sure this is the correct import for the Form component
import React from "react";
import Link from "next/link";
import { Product } from "@/types/types";
import SubmitFormButton from "@/components/buttons/SubmitFormButton";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Toast from "@/components/Toast";
import { getProductById, putProduct } from "@/services/api/productsApi";
import Image from "next/image";
import placeholder from "../../../../../public/placeholder.png";

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

const EditProductForm: React.FC<{ id: string }> = async ({ id }) => {
  const { product, errorMessage }: { product: Product; errorMessage: string | null } = await getProductById(id);

  return (
    <Form action={editProductAction} className="flex flex-col gap-4">
      <div className="p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
        <div className="w-full sm:mt-0 text-left">
          {/* Modal Head */}
          <div className="grid grid-cols-2">
            <div>
              <h4>Izmena postojećeg proizvoda</h4>
              <h4>{product.productName}</h4>
            </div>
            <div className="flex justify-end">
              {product.productImage ? (
                <Image src={product.productImage} alt="Product image" width={80} height={80} />
              ) : (
                <Image src={placeholder} alt="Product image" width={80} height={80} />
              )}
            </div>
          </div>

          {/* Hidden productId */}
          <input type="hidden" name="productId" value={product.productId} />
          <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
          {/* Modal Body */}
          <div className="my-2">
            <h5>Podaci o proizvodu:</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div>
              <label htmlFor="productName">Naziv proizvoda</label>
              <input
                name="productName"
                defaultValue={product.productName}
                type="text"
                id="productName"
                aria-describedby="Naziv proizvoda"
                maxLength={64}
                required
              />
            </div>
            <div>
              <label htmlFor="productDesc">Opis</label>
              <textarea
                name="productDesc"
                defaultValue={product.productDesc || ""}
                id="productDesc"
                aria-describedby="Opis proizoda"
                maxLength={128}
              />
            </div>
            <div>
              <label htmlFor="productBarcode">Barcode</label>
              <input
                name="productBarcode"
                defaultValue={product.productBarcode}
                type="text"
                id="productBarcode"
                aria-describedby="Barcode"
                maxLength={64}
              />
            </div>
            <div>
              <label htmlFor="productPrice">Cena</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="productPrice"
                defaultValue={product.productPrice}
                id="productPrice"
                aria-describedby="Cena"
                maxLength={16}
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="productImage">Nova slika</label>
          <input type="file" name="productImage" id="productImage" />
        </div>

        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

        {/* Modal Buttons */}
        <div className="gap-2 flex justify-end">
          <Link href="/admin/products" className="button button-tertiary">
            Odustani
          </Link>
          <SubmitFormButton buttonText="Izmeni proizvod" />
        </div>
      </div>
      {errorMessage && <Toast errorMessage={errorMessage} />}
    </Form>
  );
};

export default EditProductForm;
