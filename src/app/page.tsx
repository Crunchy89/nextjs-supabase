"use client";
import { todos_model } from "@/services/supabase";
import { useEffect, useState } from "react";
import { Todo } from "@/types";

export default function Home() {
  const [todos,setTodo] = useState<Todo>({} as Todo);
  const [todoList,setTodoList] = useState<Todo[]>([]);
  const [loading,setLoading] = useState(false);

  const realtimeData = (payload: any) => {
    console.log(payload);
  }

  useEffect(()=>{
    todos_model.Subscribe(realtimeData)
  },[])

  const getTodos = async () => {
    await todos_model.GetAll()
    .then((data) => {
      setTodoList(data as Todo[]);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    getTodos();
  },[]);

  const addTodo = async () => {
    setLoading(true);
    await todos_model.Insert([todos])
    .then(() => {
      getTodos();
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    })
  }

  const updateTodo = async (id: number,data:Todo) => {
    setLoading(true);
    await todos_model.Update(id,data)
    .then(() => {
      getTodos();
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    })
  }

  const deleteTodo = async (id: number) => {
    setLoading(true);
    await todos_model.Delete(id)
    .then(() => {
      getTodos();
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    })
  }

  return (
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Add Todo"
          value={todos.title || ""}
          onChange={(e) => setTodo({ ...todos, title: e.target.value,completed: false })}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
          onClick={addTodo}
          disabled={loading}
        >
          Add
        </button>
        </div>
        <ul>
        {todoList.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={todo.completed}
            onChange={() => updateTodo(todo.id as number,{completed: !todo.completed})}
            disabled={loading}
          />
          <span className={todo.completed ? "line-through" : ""}>
            {todo.title}
          </span>
          <button
            className="ml-auto bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
            onClick={() => deleteTodo(todo.id as number)}
            disabled={loading}
          >
            Delete
          </button>
          </li>
        ))}
        </ul>
      </div>
      );
}
