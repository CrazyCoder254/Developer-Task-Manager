import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskDialog from "../components/TaskDialog";
import Navbar from "../components/Navbar";
import { toast } from "sonner";

export default function DeveloperDashboard() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await API.get("/tasks/me");
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  const createTask = async (payload) => {
    const res = await API.post("/tasks", payload);
    setTasks(prev => [res.data, ...prev]);
    toast("Task created ✔️");
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    const res = await API.put(`/tasks/${id}`, { completed: !task.completed });
    setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
    toast("Task deleted 🗑️" );
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Developer Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your personal tasks</p>
          </div>
          <TaskDialog onSubmit={createTask} />
        </div>

        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h2 className="font-semibold text-green-900 dark:text-green-100">Developer View</h2>
          <p className="text-sm text-green-700 dark:text-green-300">
            You can create, edit, and delete your own tasks. Total tasks: {tasks.length}
          </p>
        </div>

        <section
          className="grid gap-6
                     sm:grid-cols-2
                     lg:grid-cols-3
                     xl:grid-cols-4"
        >
          {tasks.map(t => (
            <TaskCard
              key={t._id}
              task={t}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </section>
      </main>
    </>
  );
}