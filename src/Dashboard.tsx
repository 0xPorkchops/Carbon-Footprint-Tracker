import { createColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { useUserContext } from "@/components/user-context";
import { DataChart } from "@/components/data-chart";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddDialogContent } from "@/components/dialogs/add-dialog-content";

export default function Dashboard() {
  const { getAllEntries, deleteEntry } = useUserContext();
  const carbonEntries = getAllEntries();
  const columns = createColumns(deleteEntry);

  return (
    <div className="container mx-auto py-10">
      <DataChart />
      <DataTable columns={columns} data={carbonEntries} />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-16 w-16 rounded-lg shadow-lg rotate-45 transition-transform hover:scale-110"
          >
            <div className="relative -rotate-45 w-full h-full flex items-center justify-center">
              <div className="absolute w-[60%] h-[4px] bg-primary-foreground rounded-full"></div>
              <div className="absolute w-[4px] h-[60%] bg-primary-foreground rounded-full"></div>
            </div>
            <span className="sr-only">Add emission</span>
          </Button>
        </DialogTrigger>
        <AddDialogContent />
      </Dialog>
    </div>
  );
}
