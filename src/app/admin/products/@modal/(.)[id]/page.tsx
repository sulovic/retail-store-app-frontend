import { Suspense } from "react";
import ViewProductForm from "@/app/admin/products/components/ViewProduct";
import ViewProductSkeleton from "@/app/admin/products/components/ViewProductSkeleton";

export default async function ProductModal({ params }: { params: Promise<any> }) {
  const { id } = await params;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Suspense fallback={<ViewProductSkeleton />}>
        <ViewProductForm id={id} />
      </Suspense>
    </div>
  );
}
