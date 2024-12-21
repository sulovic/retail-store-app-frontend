import NewUserForm from "@/app/admin/users/components/NewUserForm";

export default function NewUserModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <NewUserForm />
    </div>
  );
}