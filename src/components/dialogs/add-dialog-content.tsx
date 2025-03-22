import { useState } from "react";
import { useUserContext } from "@/components/user-context";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AddDialogContent() {
  const { activeUser, updateUser } = useUserContext();
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("");
  const [emission, setEmission] = useState("");
  const [date, setDate] = useState("");
  
  const handleSaveEntry = () => {
    if (activeUser) {
      updateUser({ ...activeUser, name: activity });
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
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1"
          placeholder="Category"
        />
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
      <Separator />
      <Label htmlFor="date">Date</Label>
      <div className="flex items-center gap-2">
        <Input
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1"
          placeholder="Date"
        />
      </div>
      <DialogFooter>
        <Button onClick={handleSaveEntry}>Add</Button>
      </DialogFooter>
    </DialogContent>
  );
}
