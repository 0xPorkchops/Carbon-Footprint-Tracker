import { createColumns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { CarbonEntry, useCarbonEntries } from "@/hooks/use-carbon-entries"

export default function DemoPage() {
  const carbonEntriesHook = useCarbonEntries();
  const data: CarbonEntry[] = carbonEntriesHook.getAllEntries();
  
  const columns = createColumns(carbonEntriesHook.deleteEntry);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}