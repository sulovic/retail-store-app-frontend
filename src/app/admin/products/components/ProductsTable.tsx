import { PaginationType, Product } from "@/types/types";
import Link from "next/link";
import { DeleteIcon, EditIcon, SearchIcon } from "@/components/Icons";
import Pagination from "@/components/common/Pagination";
import { getProducts, getProductsCount } from "@/services/api/productsApi";
import Toast from "@/components/Toast";

const ProductsTable: React.FC<{ search: string; pagination: PaginationType }> = async ({ search, pagination }) => {
  const tableHeaders = ["Naziv proizvoda", "Opis", "Barcode", "Cena", "Akcija"];

  let { products, errorMessage: productErrorMessage }: { products: Product[]; errorMessage: string | null } =
    await getProducts({ search, pagination });

  let { count: totalProducts, errorMessage: countErrorMessage }: { count: number; errorMessage: string | null } =
    await getProductsCount({ search });

  pagination.count = totalProducts || 1;

  return (
    <>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((tableKey, index) => (
              <th key={index}>{tableKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="overflow-hidden text-ellipsis text-left" key={`productName${index}`}>
                {product?.productName}
              </td>
              <td className="overflow-hidden text-ellipsis text-left" key={`productDescription_${index}`}>
                {product?.productDesc}
              </td>
              <td key={`productBarcode_${index}`}>{product?.productBarcode}</td>
              <td key={`regularPrice_${index}`}>
                {product?.productPrice.toLocaleString("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="flex justify-end gap-4" key={`action_${index}`}>
                <Link href={`/admin/products/${product?.productId}`}>
                  <SearchIcon size={40} />
                </Link>
                <Link href={`/admin/products/${product?.productId}/delete`}>
                  <DeleteIcon size={40} />
                </Link>
                <Link href={`/admin/products/${product?.productId}/edit`}>
                  <EditIcon size={40} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-2 flex justify-end items-center gap-2 md:my-4">
        <Pagination pagination={pagination} />
      </div>
      {productErrorMessage && <Toast errorMessage={productErrorMessage} />}
      {countErrorMessage && <Toast errorMessage={countErrorMessage} />}
    </>
  );
};

export default ProductsTable;
