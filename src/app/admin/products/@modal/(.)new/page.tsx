import NewProductForm from "@/app/admin/products/components/NewProductForm";

export default function NewProduct() {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <NewProductForm />
      </div>
    </>
  );
}
