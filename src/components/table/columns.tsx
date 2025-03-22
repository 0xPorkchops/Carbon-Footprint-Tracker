"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CarbonEntry } from "@/components/user-context"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { UpdateDialogContent } from "@/components/dialogs/update-dialog-content"

interface ActionCellProps {
  entry: CarbonEntry;
  onDelete: (id: string) => void;
}

const ActionCell = ({ entry, onDelete }: ActionCellProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => {e.preventDefault();}}>Update</DropdownMenuItem>
          </DialogTrigger>
          <UpdateDialogContent entryId={entry.id} />
        </Dialog>
        <DropdownMenuItem onClick={() => onDelete(entry.id)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const createColumns = (onDelete: (id: string) => void): ColumnDef<CarbonEntry>[] => [
  {
    accessorKey: "activity",
    header: "Activity",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "emission",
    header: "Emission",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell entry={row.original} onDelete={onDelete} />,
  },
];