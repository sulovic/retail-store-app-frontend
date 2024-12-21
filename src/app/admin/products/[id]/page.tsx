import { Suspense } from "react";
import ViewProduct from "@/app/admin/products/components/ViewProduct";
import ViewProductSkeleton from "@/app/admin/products/components/ViewProductSkeleton";

export default async function ProductPage ({ params }: { params: Promise<any> }) {
  const { id } = await params;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<ViewProductSkeleton />}>
        <ViewProduct id={id} />
      </Suspense>
    </div>
  );
};
