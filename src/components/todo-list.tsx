"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Pencil, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "./header"
import Footer from "./footer"

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // Create a new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Toggle todo completion status
  const toggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Start editing a todo
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = () => {
    if (editText.trim() === "") return

    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Handle key press for adding new todo
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full p-4 sm:p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addTodo} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No tasks yet. Add one above!</p>
            ) : (
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    {editingId === todo.id ? (
                      <div className="flex items-center space-x-2 flex-1">
                        <Input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                          autoFocus
                          className="flex-1"
                        />
                        <Button onClick={saveEdit} size="icon" variant="ghost">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button onClick={cancelEdit} size="icon" variant="ghost">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 flex-1">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleComplete(todo.id)}
                            id={`todo-${todo.id}`}
                          />
                          <label
                            htmlFor={`todo-${todo.id}`}
                            className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {todo.text}
                          </label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button onClick={() => startEditing(todo)} size="icon" variant="ghost">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => deleteTodo(todo.id)}
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
