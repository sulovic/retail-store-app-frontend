import { Suspense } from "react";
import DeleteUser from "@/app/admin/users/components/DeleteUser";
import ViewUserSkeleton from "@/app/admin/users/components/ViewUserSkeleton";

const Product = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<ViewUserSkeleton />}>
        <DeleteUser id={id} />
      </Suspense>
    </div>
  );
};

export default Product;
