import React, { useState, useRef } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({ todo, editableTodoId, setEditableTodoId }) {
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const inputRef = useRef(null)

    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const isEditable = (editableTodoId === todo.id)


    const update = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setEditableTodoId(null)
    }
    
    if (isEditable) {
        // update the todo changes with enter key with event listener
        inputRef.current.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                update()
            }
        })
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
        if (isEditable) {
            setEditableTodoId(null)
        }
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                ref={inputRef}
                className={`border outline-none w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return

                    if (!isEditable) {
                        setEditableTodoId(todo.id)
                        inputRef.current.focus()
                    } else {
                        update()
                    }
                }}
                disabled={todo.completed}
            >
                {isEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    )
}

export default TodoItem
