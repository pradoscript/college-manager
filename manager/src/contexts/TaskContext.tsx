import { createContext } from "react";
import { Task } from "../entities/Task";

interface TaskContextData {
    tasks: Task[]
    createTask: (attributes: Omit<Task, 'id'>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    updateTask: (id: string, attributes: Partial<Omit<Task, 'id'>>) => Promise<void>
}

export const TaskContext = createContext({} as TaskContextData)