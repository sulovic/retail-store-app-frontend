import Form from "next/form"; // Make sure this is the correct import for the Form component
import React from "react";
import Link from "next/link";
import SubmitFormButton from "@/components/buttons/SubmitFormButton";

const NewProductForm: React.FC<{ newProcuctAction: (data: FormData) => Promise<void> }> = ({ newProcuctAction }) => {
  return (
    <Form action={newProcuctAction} className="flex flex-col gap-4">
      <div className="m-4 p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
        <div className="w-full sm:mt-0 text-left">
          {/* Modal Head */}
          <h4 className="p-0">Dodavanje novog proizvoda</h4>
          <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
          {/* Modal Body */}
          <div className="my-2">
            <h5>Podaci o proizvodu:</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div>
              <label htmlFor="productName">Naziv proizvoda</label>
              <input
                type="text"
                id="productName"
                name="productName"
                aria-describedby="Naziv proizvoda"
                maxLength={64}
                required
              />
            </div>
            <div>
              <label htmlFor="productDesc">Opis</label>
              <textarea id="productDesc" name="productDesc" aria-describedby="Opis proizoda" maxLength={128} />
            </div>
            <div>
              <label htmlFor="productBarcode">Barcode</label>
              <input type="text" id="productBarcode" name="productBarcode" aria-describedby="Barcode" maxLength={64} />
            </div>
            <div>
              <label htmlFor="productPrice">Cena</label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="productPrice"
                name="productPrice"
                aria-describedby="Cena"
                maxLength={16}
                required
              />
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

        {/* Modal Buttons */}
        <div className="gap-2 flex flex-row-reverse">
          <SubmitFormButton buttonText="Dodaj proizvod" />
          <Link href="/admin/products" className="button button-gray">
            Odustani
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default NewProductForm;
