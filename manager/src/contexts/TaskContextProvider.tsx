import { ReactNode, useEffect, useState } from "react";
import { TaskContext } from "./TaskContext";
import { taskServices } from "../services/api";
import { Task } from "../entities/Task";
import { z } from "zod"

interface TaskContextProps {
    children: ReactNode
}

const UpdateTaskSchema = z.object({
    subject: z.string().optional(),
    description: z.string().optional(),
    difficulty: z.enum(["Low", "Medium", "High"]).optional(),
    status: z.enum(["todo", "doing", "done"]),
    date: z.string().optional()
});

export const TaskContextProvider: React.FC<TaskContextProps> = ({ children }) => {

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        taskServices.fetchTask().then((storedTasks) => {
            setTasks(storedTasks)
        })
    }, [])

    const createTask = async (attributes: Omit<Task, 'id'>) => {
        const task = await taskServices.save(attributes)
        setTasks(currentState => [...currentState, task])
    }

    const deleteTask = async (id: string) => {
        setTasks((current) => {
            const newArr = current.filter(task => task.id !== id)
            return newArr
        })
        await taskServices.delete(id)
    }

    const updateTask = async (id: string, attributes: Partial<Omit<Task, 'id'>>) => {
        const checkedData = UpdateTaskSchema.parse(attributes)
        setTasks((currentState) => {
            const updatedTasks = [...currentState]
            const index = updatedTasks.findIndex(task => task.id === id)
            Object.assign(updatedTasks[index], checkedData)
            return updatedTasks
        })
        await taskServices.update(id, attributes)
    }


return (
    <TaskContext.Provider value={({ tasks, createTask, deleteTask, updateTask })}>
        {children}
    </TaskContext.Provider>
)
}