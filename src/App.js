import React, { useState } from 'react'
import TodoList from './Components/TodoList'
import ModalInputNewAndEditTodo from './Components/ModalInputNewAndEditTodo'
import 'antd/dist/antd.css'

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [edit, setEdit] = useState({})

  const uniqueId = () => Date.now() + Math.round(Math.random() * 1_000)
  const [todos, setTodos] = useState([
    {
      id: uniqueId(),
      title: 'Первое дело',
      completed: false,
      important: false,
      date: '12.01.2022',
      isEdit: false,
    },
    {
      id: uniqueId(),
      title: 'Второе дело',
      completed: true,
      important: false,
      date: '12.01.2022',
      isEdit: false,
    },
    {
      id: uniqueId(),
      title: 'Третье дело',
      completed: false,
      important: true,
      date: '12.01.2022',
      isEdit: false,
    },
    {
      id: uniqueId(),
      title: 'Четвертое дело',
      completed: true,
      important: true,
      date: '17.01.2022',
      isEdit: false,
    },
  ])
  
  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible)
  }

  const openModal = (newTodo, index) => {
    let title = ''
    if (newTodo) {
      title = 'Новая задача'
      setEdit({title})
    } else {
      title = 'Редактировать задачу'
      setEdit({title: todos[index].title, date: todos[index].date, index})
    }
    setModalTitle(title)
    toggleModalVisible() 
  }
  const toggleCompletedTodo = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const toggleImportantTodo = id => {

    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.important = !todo.important
        }
        return todo
      })
    )
  }

  const createNewTodoOrEdit = (title, date, index) => {
    if (isNaN(index)) {
      setTodos(
        todos.concat([
          {
            id: uniqueId(),
            title,
            completed: false,
            important: false,
            date,
          }
        ])
      )
    } else {
        setTodos(todos.map((todo, i) =>
          i === index ? { ...todo, title, date, completed: false} : todo)
        )
    }
  }

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <h1>Список дел</h1>
      <ModalInputNewAndEditTodo
        modalTitle={modalTitle}
        visible={isModalVisible}
        modalVisible={toggleModalVisible}
        createNewTodoOrEdit={createNewTodoOrEdit}
        edit={edit}
      />

      <TodoList
        todos={todos}
        onCompleted={toggleCompletedTodo}
        onImportant={toggleImportantTodo}
        onRemove={removeTodo}
        modalVisible={openModal}
      />
    </div>
  )
}

export default App
