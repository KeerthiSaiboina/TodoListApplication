import React, {useState, useEffect} from 'react'

const TodoList = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const fetchTasks = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()
    setTasks(result.tasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreateTask = async e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({description: newTask}),
    })

    const result = await response.json()
    setTasks([...tasks, result.task])
    setNewTask('')
  }

  const handleUpdateStatus = async (id, status) => {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({status}),
    })

    fetchTasks() // Refresh tasks after status update
  }

  const handleDeleteTask = async id => {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.description}
            <select
              onChange={e => handleUpdateStatus(task.id, e.target.value)}
              value={task.status}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
