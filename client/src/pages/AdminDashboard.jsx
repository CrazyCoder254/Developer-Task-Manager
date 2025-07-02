import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskDialog from "../components/TaskDialog";
import Navbar from "../components/Navbar";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await API.get("/tasks/all");
      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const createTask = async (payload) => {
    try {
      const res = await API.post("/tasks", payload);
      setTasks(prev => [res.data, ...prev]);
      toast.success("Task created ✔️");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const res = await API.put(`/tasks/${id}`, { completed: !task.completed });
      setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
      toast.success("Task updated ✔️");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
      toast.success("Task deleted 🗑️");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading tasks...</div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage all tasks across the organization</p>
          </div>
          <TaskDialog onSubmit={createTask} />
        </div>

        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="font-semibold text-blue-900 dark:text-blue-100">Admin View</h2>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            You can view, edit, and delete all tasks from all users. Total tasks: {tasks.length}
          </p>
        </div>

        <section
          className="grid gap-6
                     sm:grid-cols-2
                     lg:grid-cols-3
                     xl:grid-cols-4"
        >
          {tasks.map(t => (
            <div key={t._id} className="relative">
              <TaskCard
                task={t}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
              {t.owner && (
                <div className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                  @{t.owner.username}
                </div>
              )}
            </div>
          ))}
        </section>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No tasks found. Create the first task to get started!
            </p>
          </div>
        )}
      </main>
    </>
  );
} 