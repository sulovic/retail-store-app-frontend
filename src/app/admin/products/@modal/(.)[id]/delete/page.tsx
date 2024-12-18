import { Suspense } from "react";
import DeleteProduct from "@/app/admin/products/components/DeleteProduct";
import ViewProductSkeleton from "@/app/admin/products/components/ViewProductSkeleton";

const DeleteProductPage = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;


  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Suspense fallback={<ViewProductSkeleton />}>
          <DeleteProduct id={id} />
        </Suspense>
      </div>
  );
};

export default DeleteProductPage;
