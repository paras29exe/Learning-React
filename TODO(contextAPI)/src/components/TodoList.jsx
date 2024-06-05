import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";


export function TodoList() {
    const { todos } = useTodo()
    const [editableTodoId, setEditableTodoId] = useState(null)

    return (
        <>
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                    <TodoItem 
                    todo={todo}
                    editableTodoId={editableTodoId}
                    setEditableTodoId={setEditableTodoId}
                    />
                </div>
            ))}
        </>
    )
}
