import { Suspense } from "react";
import ProductData from "@/app/admin/products/components/forms/ViewProductForm";
import ViewProductSkeleton from "../components/ViewProductSkeleton";

const Product = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;

  return (
    <div>
      <Suspense fallback={<ViewProductSkeleton />}>
        <ProductData id={id} />
      </Suspense>
    </div>
  );
};

export default Product;
