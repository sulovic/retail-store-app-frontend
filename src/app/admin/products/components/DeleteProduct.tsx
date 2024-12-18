import { Product } from "@/types/types";
import Image from "next/image";
import placeholder from "../../../../../public/placeholder.png";
import { getProductById } from "@/services/api/productsApi";
import Toast from "@/components/Toast";
import { deleteProduct } from "@/services/api/productsApi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Form from "next/form";
import Link from "next/link";
import SubmitFormButton from "@/components/buttons/SubmitFormButton";
import { join } from "path";

async function deleteProductAction(formData: FormData) {
  "use server";

  const id = formData.get("productId")?.toString() || "";
  const productName = formData.get("productName")?.toString() || "";

  const { product: addedProduct, errorMessage } = await deleteProduct(id);
  revalidatePath("/admin/products");
  if (errorMessage) {
    const errorRedirectUrl = `/admin/products?error=${encodeURIComponent(`Proizvod ${productName}: ${errorMessage}`)}`;
    redirect(errorRedirectUrl);
  }
  const redirectUrl = `/admin/products?success=${encodeURIComponent(
    `Proizvod ${addedProduct.productName} je uspešno izbrisan!`
  )}`;
  redirect(redirectUrl);
}

const DeleteProduct: React.FC<{ id: string }> = async ({ id }) => {

  await new Promise((test) => setTimeout(test, 3000));
  const { product, errorMessage }: { product: Product; errorMessage: string | null } = await getProductById(id);

  return (
    <Form action={deleteProductAction} className="flex flex-col gap-4">
      <div className="p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
        <div className="w-full sm:mt-0 text-left">
          {/* Modal Head */}
          <h4 className="p-0">Brisanje proizvoda</h4>
          <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
          {/* Modal Body */}
          <div className="my-2">
            <h5>Podaci o proizvodu:</h5>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <div>
              <div>
                <label htmlFor="productName">Naziv proizvoda</label>
                <p>{product.productName}</p>
              </div>
              <div>
                <label htmlFor="productDesc">Opis</label>
                <p> {product.productDesc}</p>
              </div>
              <div className="grid  grid-cols-2">
                <div>
                  <label htmlFor="productBarcode">Barcode</label>
                  <p>{product.productBarcode}</p>
                </div>
                <div>
                  <label htmlFor="productPrice">Cena</label>
                  <p>{product.productPrice}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {product.productImage ? (
                <Image src={product.productImage} alt="Product image" width={200} height={200} />
              ) : (
                <Image src={placeholder} alt="Product image" width={200} height={200} />
              )}
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

        {/* Modal Buttons */}
        <div className="gap-2 flex justify-end">
          <Link href="/admin/products" className="button button-tertiary">
            Odustani
          </Link>
          <SubmitFormButton option="danger" buttonText="Obriši proizvod" />
        </div>
        <input type="hidden" name="productId" value={product.productId} />
        <input type="hidden" name="productName" value={product.productName} />

        {errorMessage && <Toast errorMessage={errorMessage} />}
      </div>
    </Form>
  );
};

export default DeleteProduct;
