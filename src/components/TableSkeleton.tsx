import Skeleton from "@/components/Skeleton";

const TableSkeleton = ({ tableHeaders, rowsCount }: { tableHeaders: string[]; rowsCount: number }) => {
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((tableKey, index) => (
            <th key={index}>{tableKey}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {new Array(rowsCount).fill(0).map((_, index) => (<tr key={index}>
          {new Array(tableHeaders.length).fill(0).map((_, index) => (
            <td key={index}>
              <Skeleton className="w-auto h-10" />
            </td>
          ))}
        </tr>))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
