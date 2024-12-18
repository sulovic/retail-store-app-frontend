import Skeleton from "@/components/Skeleton";
const EditProductSkeleton: React.FC = async () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
        <div className="w-full sm:mt-0 text-left">
          {/* Modal Head */}
          <div className="grid grid-cols-2">
            <div>
              <h4>Izmena postojećeg proizvoda</h4>
              <Skeleton className="w-auto h-10" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="w-20 h-20" />
            </div>
          </div>
          <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

          {/* Modal Body */}
          <div className="my-2">
            <h5>Podaci o proizvodu:</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div>
              <label htmlFor="productName">Naziv proizvoda</label>
              <Skeleton className="w-auto h-8" />

            </div>
            <div>
              <label htmlFor="productDesc">Opis</label>
              <Skeleton className="w-auto h-24" />

            </div>
            <div>
              <label htmlFor="productBarcode">Barcode</label>
              <Skeleton className="w-auto h-8" />

            </div>
            <div>
              <label htmlFor="productPrice">Cena</label>
              <Skeleton className="w-auto h-8" />

            </div>
          </div>
        </div>
        <div>
          <label htmlFor="productImage">Nova slika</label>
          <input type="file" name="productImage" id="productImage" />
        </div>

        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

        {/* Modal Buttons */}
        <div className="gap-2 flex justify-end">
          <Skeleton className="w-28 h-12" />
          <Skeleton className="w-28 h-12" />
        </div>
      </div>
    </div>
  );
};

export default EditProductSkeleton;
