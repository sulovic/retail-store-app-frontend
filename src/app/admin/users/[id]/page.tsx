import { Suspense } from "react";
import ViewUser from "@/app/admin/users/components/ViewUser";
import ViewUserSkeleton from "@/app/admin/users/components/ViewUserSkeleton";

export default async function UserPage({ params }: { params: Promise<any> }) {
  const { id } = await params;

  return (
    <div className="flex justify-center">
      <Suspense fallback={<ViewUserSkeleton />}>
        <ViewUser id={id} />
      </Suspense>
    </div>
  );
}
