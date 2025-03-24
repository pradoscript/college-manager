import { Badge, Button, Card, Flex, Text } from "@radix-ui/themes"
import { Task, TaskDifficulty, TaskStatus } from "../entities/Task"
import { useTask } from "../hooks/useTask"


interface TaskCardProps {
    task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({task}) => {

    const {deleteTask, updateTask} = useTask()

    const getActionText = (status: TaskStatus) => {
        const actionTexts: {[key: string]: 'Start' | "Finish"} = {
            "todo": "Start",
            "doing": "Finish"
        }
        return actionTexts[status]
    }
    
    const getActionColor = (status: TaskStatus) => {
        const actionColor: {[key: string]: "indigo" | "green" | "bronze"} = {
            "todo": "indigo",
            "doing": "green"
        }
        return actionColor[status]
    }

    const getDifficultyColor = (difficulty: TaskDifficulty) => {
        const difficultyColor: {[key: string]: 'sky' | 'amber' | 'tomato'} = {
            'Low': 'sky',
            'Medium': 'amber',
            'High': 'tomato'
        }
        return difficultyColor[difficulty]
    }
    
    const handleDelete = async (id: string) => {
        await deleteTask(id)
    }

    const handleUpdate = async() => {
        if(task.status === 'todo'){
            updateTask(task.id, {status: "doing"})
        } else if (task.status === 'doing'){
            updateTask(task.id, {status: "done"})
        }
        
    }

    return (
        <Card>
            <Flex align='center' gap='2'>
                <Text>{task.subject}</Text>
                <Badge color={getDifficultyColor(task.difficulty)}>Difficulty: {task.difficulty}</Badge>
            </Flex>
            <Text as='p' my='3'>{task.description}</Text>
            <Text as='div'>Final Date: {new Date(task.date).toLocaleDateString("pt-BR")}</Text>
            <Flex justify='end' my='3' gap='4'>
                {task.status !== 'done' ? (<Button onClick={handleUpdate} color={getActionColor(task.status)}>
                    {getActionText(task.status)}
                </Button>): ''}
                <Button onClick={() => handleDelete(task.id)} color="tomato">
                    Delete
                </Button>
            </Flex>
        </Card>
    )
}