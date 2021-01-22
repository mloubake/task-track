/* Libs usadas

  - React Icons
  npm i react-icons

  - Json Server: Lib para Mockar um Rest API Backend Server 
  npm i json-server
  Para todar o Json-Server Mock Rest API Backend server, inclua no Package.JSON isso:
   "server": "json-server --watch db.json --port 5000"
*/

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

function App() {
  // const name = "Matheus"
  // const idade = 2021 - 1990
  // const verdade = true

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">

        <Header titulo="Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />


        {/* Passando um tipo diferente de STRING na tipação do TITULO, resulta em um erro/aviso no Console.log  */}
        {/* Warning: Failed prop type: Invalid prop `titulo` of type `number` supplied to `Header`, expected `string`. */}
        {/* <Header titulo={1} /> */}

        {/* Alguns usos de variáveis */}
        {/* <h2>Hello {name} de {idade}, né? </h2>
      <h2>{verdade ? 'Sim' : 'Não'}</h2> */}
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {
              tasks.length > 0 ?
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
                : ('No Tasks To Show')
            }
          </>
        )}>

        </Route>
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
