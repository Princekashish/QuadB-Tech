import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTask, updateTaskPriority } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import { Priority } from '../types';
import { Trash2, Star } from 'lucide-react';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
              className="h-5 w-5 text-green-600 focus:ring-green-500 rounded"
            />
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={task.priority}
              onChange={(e) => dispatch(updateTaskPriority({ id: task.id, priority: e.target.value as Priority }))}
              className={`px-2 py-1 rounded border ${getPriorityColor(task.priority)} focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
      
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <Star className="h-12 w-12 mx-auto mb-4" />
          <p>No tasks yet. Add some tasks to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;