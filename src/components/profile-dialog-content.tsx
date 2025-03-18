import { useState } from "react";
import { useUserContext } from "@/components/user-context";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ProfileDialogContent() {
  const { activeUser, updateUser, deleteUser } = useUserContext();
  const [editName, setEditName] = useState(activeUser?.name || "");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  
  const handleSaveName = () => {
    if (activeUser) {
      updateUser({ ...activeUser, name: editName });
    }
  };
  const handleDeleteAccount = () => {
    if (activeUser && deleteConfirmation === "DELETE") {
      deleteUser(activeUser.id);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Manage Profile</DialogTitle>
      </DialogHeader>
      <Label htmlFor="name">Change Name</Label>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={activeUser?.avatar} alt={activeUser?.name} />
          <AvatarFallback className="rounded-lg">
            {getInitials(activeUser?.name || "??")}
          </AvatarFallback>
        </Avatar>
        <Input
          id="name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="flex-1"
          placeholder="Name"
        />
        <Button onClick={handleSaveName}>Save</Button>
      </div>
      <Separator />
      <Label htmlFor="deleteConfirm" className="text-red-500 font-medium">
        Delete Account
      </Label>
      <p className="text-sm text-muted-foreground">
        To delete your account, type "DELETE" in the field below. This action
        cannot be undone.
      </p>
      <div className="flex items-center gap-2">
        <Input
          id="deleteConfirm"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
          className="flex-1"
          placeholder="DELETE"
        />
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          disabled={deleteConfirmation !== "DELETE"}
        >
          Delete Profile
        </Button>
      </div>
    </DialogContent>
  );
}
