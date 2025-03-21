import { createColumns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { useUserContext } from "@/components/user-context";

export default function DemoPage() {
  const { getAllEntries, deleteEntry } = useUserContext();
  const carbonEntries = getAllEntries();
  const columns = createColumns(deleteEntry);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={carbonEntries} />
    </div>
  )
}