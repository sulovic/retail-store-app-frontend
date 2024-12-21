import { Suspense } from "react";
import ViewUser from "@/app/admin/users/components/ViewUser";
import ViewUserSkeleton from "@/app/admin/users/components/ViewUserSkeleton";

export default async function UserModal ({ params }: { params: Promise<any> }) {
  const { id } = await params;


  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Suspense fallback={<ViewUserSkeleton />}>
          <ViewUser id={id} />
        </Suspense>
      </div>
  );
};
