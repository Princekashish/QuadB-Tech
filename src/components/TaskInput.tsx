import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice';
import { Priority } from '../types';
import { Plus } from 'lucide-react';

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    }));

    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default TaskInput;