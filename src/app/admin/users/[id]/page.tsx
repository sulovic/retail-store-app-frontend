import { Suspense } from "react";
import ViewUser from "@/app/admin/users/components/ViewUser";
import ViewUserSkeleton from "@/app/admin/users/components/ViewUserSkeleton";

const Product = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;

  return (
    <div>
      <Suspense fallback={<ViewUserSkeleton />}>
        <ViewUser id={id} />
      </Suspense>
    </div>
  );
};

export default Product;
