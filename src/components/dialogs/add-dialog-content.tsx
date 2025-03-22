import { useState } from "react";
import { Category, useUserContext } from "@/components/user-context";

import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "@/components/ui/combobox";

export function AddDialogContent() {
  const { activeUser, createEntry } = useUserContext();
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("");
  const [emission, setEmission] = useState("");
  
  const handleAddEntry = () => {
    if (activeUser) {
      createEntry(category as Category, activity, parseFloat(emission));
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Carbon Entry</DialogTitle>
      </DialogHeader>
      <Label htmlFor="activity">Activity</Label>
      <div className="flex items-center gap-2">
        <Input
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="flex-1"
          placeholder="Activity"
        />
      </div>
      <Separator />
      <Label htmlFor="category">Category</Label>
      <div className="flex items-center gap-2">
        <Combobox type="category" elements={Object.values(Category)} onChange={setCategory} />
      </div>
      <Separator />
      <Label htmlFor="emission">Emission</Label>
      <div className="flex items-center gap-2">
        <Input
          id="emission"
          value={emission}
          onChange={(e) => setEmission(e.target.value)}
          className="flex-1"
          placeholder="Emission"
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleAddEntry}>Add</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
