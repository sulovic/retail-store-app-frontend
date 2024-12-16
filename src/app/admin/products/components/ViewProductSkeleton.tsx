import Skeleton from "@/components/Skeleton";
const ViewProductSkeleton: React.FC = async () => {
  return (
    <div className="m-4 p-4 transform w-full max-w-3xl overflow-hidden border-zinc-200 border-2 rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:p-8">
      <div className="w-full sm:mt-0 text-left">
        {/* Modal Head */}
        <h4 className="p-0">Pregled proizvoda</h4>
        <div className="my-4 w-full h-0.5 bg-zinc-400"></div>
        {/* Modal Body */}
        <div className="my-2">
          <h5>Podaci o proizvodu:</h5>
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div>
            <div>
              <label htmlFor="productName">Naziv proizvoda</label>
              <Skeleton className="w-auto h-8" />
            </div>
            <div>
              <label htmlFor="productDesc">Opis</label>
              <Skeleton className="w-auto h-8" />
            </div>
            <div className="grid  grid-cols-2">
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
          <div className="flex justify-center items-center">
            <Skeleton className="w-52 h-52" />
          </div>
        </div>
      </div>
      <div className="my-4 w-full h-0.5 bg-zinc-400"></div>

      {/* Modal Buttons */}
      <div className="gap-2 flex flex-row-reverse">
        <Skeleton className="w-28 h-12" />
      </div>
    </div>
  );
};

export default ViewProductSkeleton;
