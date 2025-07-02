import { Card, CardContent, CardFooter, CardHeader, CardTitle }
  from "@/components/ui/card";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <Card
      className={`relative animation-fade ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-zinc-400" : ""
          }`}
        >
          {task.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm dark:text-zinc-300">{task.description}</p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          size="icon"
          variant={task.completed ? "outline" : "secondary"}
          onClick={() => onToggle(task._id)}
        >
          <CheckCircleIcon className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(task._id)}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}