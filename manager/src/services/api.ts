import { Task } from "../entities/Task"

export const taskServices = {

    async fetchTask(): Promise<Task[]> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
        const data: Task[] = await response.json()
        return data
    },

    async save(body: Omit<Task, 'id'>): Promise<Task> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const data: Task =  await response.json()
        return data
    },

    async delete(id: string) {
        await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: 'DELETE'
        })
    },

    async update(id:string, attributes: Partial<Omit<Task, 'id'>>): Promise<Task>{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(attributes)
        })
        const data: Task = await response.json()
        return data
    }

}