import { Box, Flex, Heading } from "@radix-ui/themes"
import { CreateTaskForm } from "./components/CreateTaskForm"
import { TaskBoard } from "./components/TaskBoard"
import { TaskContextProvider } from "./contexts/TaskContextProvider"

function App() {
  return (

    <TaskContextProvider>
      <Box maxWidth='80rem' mx="auto">
        <Flex direction='row' align='center' height='4rem' px='4' gap='4'>
          <Heading size='8' as='h1'>College Manager</Heading>
          <CreateTaskForm />
        </Flex>

        <Box px='4' maxWidth='80rem' mx='auto'>
          <Heading className='mb-3' as="h2">Task Board</Heading>
          <TaskBoard />
        </Box>
      </Box>
    </TaskContextProvider>


  )
}

export default App
