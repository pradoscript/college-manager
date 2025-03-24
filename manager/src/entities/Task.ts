export type TaskStatus = "todo" | "doing" | "done"
export type TaskDifficulty = "Low" | "Medium" | "High"

export interface Task {
    id: string,
    subject: string,
    description: string,
    difficulty: TaskDifficulty,
    status: TaskStatus,
    date: string
}