import { Product } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import placeholder from "../../../../../public/placeholder.png";
import { getProductById } from "@/services/api/productsApi";
import Toast from "@/components/Toast";

const ViewProduct: React.FC<{ id: string }> = async ({ id }) => {
  const { product, errorMessage }: { product: Product; errorMessage: string | null } = await getProductById(id);

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
        <div className="w-full sm:mt-0 text-left">
          {/* Modal Head */}
          <h4 className="p-0">Pregled proizvoda</h4>
          <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
          {/* Modal Body */}
          <div className="my-2">
            <h5>Podaci o proizvodu:</h5>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <div>
              <div>
                <label>Naziv proizvoda</label>
                <p>{product.productName}</p>
              </div>
              <div>
                <label>Opis</label>
                <p> {product.productDesc}</p>
              </div>
              <div className="grid  grid-cols-2">
                <div>
                  <label>Barcode</label>
                  <p>{product.productBarcode}</p>
                </div>
                <div>
                  <label>Cena</label>
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
        <div className="gap-2 flex flex-row-reverse">
          <Link href="/admin/products" className="button button-tertiary">
            Odustani
          </Link>
        </div>
        {errorMessage && <Toast errorMessage={errorMessage} />}
      </div>
    </div>
  );
};

export default ViewProduct;
