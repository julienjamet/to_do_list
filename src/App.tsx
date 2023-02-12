import { ChangeEvent, FC, useState } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {

  const [task, setTask] = useState<string>("")
  const [deadline, setDeadline] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value)
    }
    else {
      setDeadline(Number(e.target.value))
    }
  }

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      deadline: deadline
    }

    setTodoList([...todoList, newTask])
    setTask("")
    setDeadline(0)
  }

  const completeTask = (taskToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskToDelete
    }))
  }

  return (
    <div className="App">
      <div className="header">
        <div className='inputContainer'>
          <input type="text" value={task} placeholder='Task...' name="task" onChange={handleChange} />
          <input type="number" value={deadline} onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
