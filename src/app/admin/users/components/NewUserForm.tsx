import Form from "next/form"; // Make sure this is the correct import for the Form component
import React from "react";
import Link from "next/link";
import SubmitFormButton from "@/components/buttons/SubmitFormButton";
import { newUserAction } from "@/services/serverActions/userActions";
import { getStores } from "@/services/api/storesApi";
import Toast from "@/components/Toast";
import { Store } from "@/types/types";

const NewUserForm: React.FC = async () => {
  const { stores, errorMessage }: { stores: Store[]; errorMessage: string | null } = await getStores();

  return (
    <Form action={newUserAction} className="flex flex-col gap-4">
      <div className="p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
        <div className="w-full sm:mt-0 text-left">
          {/* Modal Head */}
          <h4 className="p-0">Dodavanje novog korisnika</h4>
          <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
          {/* Modal Body */}
          <div className="my-2">
            <h5>Podaci o korisniku:</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div>
              <label htmlFor="firstName">Ime</label>
              <input type="text" id="firstName" name="firstName" aria-describedby="Ime" maxLength={64} required />
            </div>
            <div>
              <label htmlFor="lastName">Prezime</label>
              <input type="text" id="lastName" name="lastName" aria-describedby="Prezime" maxLength={64} required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" aria-describedby="email" maxLength={64} />
            </div>
            <div>
              <label htmlFor="roleId">Ovlašćenja</label>
              <select id="roleId" name="roleId" aria-describedby="Ovlašćenja" required>
                <option value="1001">Seller</option>
                <option value="3001">Manager</option>
                <option value="5001">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="storesId">Prodavnice</label>
              <select id="storesId" name="storesId" aria-describedby="Prodavnice" multiple required>
                {stores.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

        {/* Modal Buttons */}
        <div className="gap-2 flex justify-end">
          <Link href="/admin/users" className="button button-tertiary">
            Odustani
          </Link>
          <SubmitFormButton buttonText="Dodaj korisnika" />
        </div>
      </div>
      {errorMessage && <Toast errorMessage={errorMessage} />}
    </Form>
  );
};

export default NewUserForm;
