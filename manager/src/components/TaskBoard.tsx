import { Badge, Flex, Grid, ScrollArea } from "@radix-ui/themes"
import { useTask } from "../hooks/useTask"
import { Task } from "../entities/Task"
import { TaskCard } from "./TaskCard"

export const TaskBoard: React.FC = () => {

    const { tasks } = useTask()

    const tasksTodo: Task[] = tasks.filter(task => task.status === "todo") ?? []
    const tasksInProgress: Task[] = tasks.filter(task => task.status === "doing") ?? []
    const tasksDone: Task[] = tasks.filter(task => task.status === "done") ?? []

    return (
        <Flex>
            <ScrollArea scrollbars='horizontal'>
                <Grid columns='3' minWidth='64rem' gap='4'>
                    <Flex direction='column' gap='4'>
                        <Badge color="gray">To Do</Badge>
                        {tasksTodo.map((task) => <TaskCard key={task.id} task={task}/>)}
                    </Flex>
                    <Flex  direction='column' gap='4'>
                        <Badge color="yellow">In Progress</Badge>
                        {tasksInProgress.map((task) => <TaskCard key={task.id} task={task}/>)}
                    </Flex>
                    <Flex  direction='column' gap='4'>
                        <Badge color="green">Done</Badge>
                        {tasksDone.map((task) => <TaskCard key={task.id} task={task}/>)}
                    </Flex>
                </Grid>
            </ScrollArea>
        </Flex>
    )
}