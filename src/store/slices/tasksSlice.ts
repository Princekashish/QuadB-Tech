import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TasksState } from "../../types";

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Buy groceries",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
      isImportant: true, // Default is false
    },
    {
      id: "2",
      title: "Finish project report",
      completed: false,
      priority: "high",
      createdAt: new Date().toISOString(),
      isImportant: true, // Default is false
    },
    {
      id: "3",
      title: "Call the bank",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
      isImportant: false, // Default is false
    },
    {
      id: "4",
      title: "Schedule dentist appointment",
      completed: false,
      priority: "low",
      createdAt: new Date().toISOString(),
      isImportant: false, // Default is false
    },
    {
      id: "5",
      title: "Plan weekend trip",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
      isImportant: true, // Default is false
    },
    {
      id: "6",
      title: "Read a book",
      completed: true,
      priority: "low",
      createdAt: new Date().toISOString(),
      isImportant: false, // Default is false
    },
    {
      id: "7",
      title: "Clean the house",
      completed: true,
      priority: "medium",
      createdAt: new Date().toISOString(),
      isImportant: true, // Default is false
    },
    {
      id: "8",
      title: "Prepare presentation",
      completed: true,
      priority: "high",
      createdAt: new Date().toISOString(),
      isImportant: false, // Default is false
    },
    {
      id: "9",
      title: "Update blog",
      completed: true,
      priority: "low",
      createdAt: new Date().toISOString(),
      isImportant: false, // Default is false
    },
  ],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleImportant: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
    updateTaskPriority: (
      state,
      action: PayloadAction<{ id: string; priority: Task["priority"] }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
  },
});

export const { addTask, removeTask, toggleImportant,toggleTask, updateTaskPriority } =
  tasksSlice.actions;
export default tasksSlice.reducer;
