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
  const [emissionError, setEmissionError] = useState("");

  const handleEmissionChange = (value: string) => {
    // There seems to be better uncontrolled ways of validating numeric input, but this will do for now
    if (value === "") {
      setEmission("");
      setEmissionError("Emission is required");
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setEmissionError("Please enter a valid number");
      return;
    }
    
    if (numValue < 0) {
      setEmissionError("Emission must be greater than or equal to 0");
      return;
    }
    
    const formattedValue = parseFloat(numValue.toFixed(2)).toString();
    setEmission(formattedValue);
    setEmissionError("");
  };

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
        <Combobox
          type="category"
          elements={Object.values(Category) as string[]}
          onChange={(value: string) => setCategory(value)}
        />
      </div>
      <Separator />
      <Label htmlFor="emission">Emission</Label>
      <div className="flex items-center gap-2">
        <Input
          id="emission"
          value={emission}
          onChange={(e) => handleEmissionChange(e.target.value)}
          className="flex-1"
          placeholder="0.00"
          type="number"
          step="0.01"
          min="0"
        />
        {emissionError && (
          <p className="text-sm text-red-500">{emissionError}</p>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleAddEntry}>Add</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
