import { Suspense } from "react";
import ViewProduct from "@/app/admin/products/components/ViewProduct";
import ViewProductSkeleton from "@/app/admin/products/components/ViewProductSkeleton";

const Product = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<ViewProductSkeleton />}>
        <ViewProduct id={id} />
      </Suspense>
    </div>
  );
};

export default Product;
