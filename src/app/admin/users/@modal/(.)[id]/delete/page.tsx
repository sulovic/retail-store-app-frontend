import { Suspense } from "react";
import DeleteUser from "@/app/admin/users/components/DeleteUser";
import ViewUserSkeleton from "@/app/admin/users/components/ViewUserSkeleton";

export default async function DeleteUserModal ({ params }: { params: Promise<any> }) {
  const { id } = await params;


  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Suspense fallback={<ViewUserSkeleton />}>
          <DeleteUser id={id} />
        </Suspense>
      </div>
  );
};

