import EditProductForm from "@/app/admin/products/components/EditProductForm";
import { Suspense } from "react";
import EditProductSkeleton from "@/app/admin/products/components/EditProductSkeleton";

export default async function EditProductModal({ params }: { params: Promise<any> }) {
  const { id } = await params;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<EditProductSkeleton />}>
        <EditProductForm id={id} />
      </Suspense>
    </div>
  );
}
