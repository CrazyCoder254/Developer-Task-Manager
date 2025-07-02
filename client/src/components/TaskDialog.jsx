import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";   // add via shadcn
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TaskDialog({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>
            Create a new task by providing a title and description.
          </DialogDescription>
        </DialogHeader>

        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea
          placeholder="Description"
          className="mt-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}