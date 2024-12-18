import { Suspense } from "react";
import DeleteProduct from "@/app/admin/products/components/DeleteProduct";
import ViewProductSkeleton from "@/app/admin/products/components/ViewProductSkeleton";

const DeleteProductPage = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;



  return (
      <div className="flex justify-center">
        <Suspense fallback={<ViewProductSkeleton />}>
          <DeleteProduct id={id} />
        </Suspense>
      </div>
  );
};

export default DeleteProductPage; 
