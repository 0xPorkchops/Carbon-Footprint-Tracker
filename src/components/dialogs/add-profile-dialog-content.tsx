import { useState } from "react";
import { useUserContext } from "@/components/user-context";

import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddProfileDialogContent() {
  const { users, addUser } = useUserContext();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const placeholderAvatar = ""; // TODO: Add avatar URL

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }

    if (
      users.some(
        (user) => user.name.toLowerCase() === value.trim().toLowerCase()
      )
    ) {
      setNameError("This name is already taken");
      return false;
    }

    setNameError("");
    return true;
  };

  const handleNameChange = (value: string) => {
    setName(value);

    if (value) {
      validateName(value);
    } else {
      setNameError("");
    }
  };

  const handleSaveName = () => {
    if (!validateName(name)) {
      return;
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      name: name.trim(),
      avatar: placeholderAvatar,
      carbonEntries: [],
    };

    addUser(newUser);

    setName("");
    setNameError("");
  };

  const isFormValid = () => name.trim() !== "" && !nameError;

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Profile</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Add Name</Label>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={placeholderAvatar} alt={name || "New User"} />
              <AvatarFallback className="rounded-lg">
                {getInitials(name || "??")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full"
                placeholder="Name"
              />
              {nameError && (
                <p className="text-sm text-red-500 mt-1">{nameError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button onClick={handleSaveName} disabled={!isFormValid()}>
            Add Profile
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
