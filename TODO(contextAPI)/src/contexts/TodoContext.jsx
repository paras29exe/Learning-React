import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const TodoContext = createContext({
    todos: [ ],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id) => { }
})

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos((prev) => [todo,...prev])
    }
    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((item) => item.id === id ? todo : item))
    }
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) => item.id !== id))
    }
    const toggleComplete = (id) => {
        setTodos((prev) => prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item))
    }

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"))

        if (storedTodos && storedTodos.length > 0) {
            setTodos(storedTodos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
            {children}
        </TodoContext.Provider>
    )
}


const useTodo = () => {
    return useContext(TodoContext)
}

export { TodoContext, TodoProvider, useTodo }