import { PlusIcon } from "@radix-ui/react-icons"
import {  Badge, Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes"
import { FormEventHandler } from "react"
import { useTask } from "../hooks/useTask"
import {z} from "zod"

const createTaskSchema = z.object({
    subject: z.string(),
    description: z.string(),
    difficulty: z.enum(["Low", "Medium", "High"]),
    status: z.enum(["todo", "doing", "done"]),
    date: z.string()
})

export const CreateTaskForm: React.FC = () => {

    const {createTask} = useTask()

    const handleSubmit: FormEventHandler<HTMLFormElement> =  async (ev) => {
        ev.preventDefault()
        
        const formData = new FormData(ev.currentTarget)
        const subject = formData.get("subject")
        const description= formData.get("description")
        const difficulty = formData.get("difficulty")
        const status = formData.get("status")
        const date = formData.get("date")
        ev.currentTarget.reset()
        const checkedData = createTaskSchema.parse({subject, description, difficulty, status, date})
        await createTask(checkedData)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>
                    <PlusIcon /> New Task
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth='32rem'>
                <Dialog.Title>
                    New Task
                </Dialog.Title>
                <Dialog.Description >
                    Add a new College Task!
                </Dialog.Description>

                <form onSubmit={handleSubmit}>
                    <Flex direction='column'>
                        <Box maxWidth='32rem' mt='4'>
                            <Text as='label' htmlFor="title">
                                Subject's Title
                            </Text>
                            <TextField.Root placeholder='Define a subject title' name='subject' id='subject' autoFocus required/>
                        </Box>

                        <Box maxWidth='32rem' mt='4'>
                            <Text as='label' htmlFor="title">
                                Project / HomeWork
                            </Text>
                            <TextArea placeholder='Define the project or homework description' name='description' id='description'/>
                        </Box>

                        <Flex  justify='between' direction='row' gap='8' mt='4'>
                            <Box>
                                <Text as='div' mb='2'>Difficulty</Text>
                                <RadioGroup.Root name='difficulty' defaultValue="Low">
                                    <RadioGroup.Item value="Low">
                                        <Badge color="sky">Low</Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="Medium">
                                        <Badge color="amber">Medium</Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="High">
                                        <Badge color="tomato">High</Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>

                            <Box>
                                <Text as='div' mb='2'>Situation</Text>
                                <RadioGroup.Root name='status' defaultValue="todo">
                                    <RadioGroup.Item value="todo">
                                        <Badge color="green">To do</Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="doing">
                                        <Badge color="amber">In Progress</Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="done">
                                        <Badge color="tomato">Done</Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>

                            <Box>
                                <Text as='div' mb='2'>Final Date</Text>
                                <input type="date" id="date" name="date"></input>
                            </Box>
                    
                        </Flex>

                        <Flex justify="end" gap="3" mt='6'>
                            <Dialog.Close>
                                <Button color="gray" variant="soft">Close</Button>
                            </Dialog.Close>
                            <Button type="submit">Create a Task</Button>
                        </Flex>

                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}