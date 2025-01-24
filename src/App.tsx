import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store';
import { Menu, Search, Grid3X3, Moon, Bell, RotateCcw, Calendar, Star, ClipboardList, Map, Plus } from 'lucide-react';
import { addTask, toggleImportant, toggleTask, } from './store/slices/tasksSlice';
import { RootState } from './store';
import { TaskDetailPanel } from "./components/sidebar"
import { motion } from 'motion/react';

const TodoApp: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showserchbar, setShowserchbar] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [view, setView] = useState(false)
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const dispatch = useDispatch();
  console.log(selectedTask);


  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    dispatch(addTask({
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      isImportant: false,
    }));

    setNewTask('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };
  const handleTaskClick = (task: any) => {
    setSelectedTask(task); // Set the clicked task to the selectedTask state
  };

  const handleToggleTask = (taskId: string) => {
    dispatch(toggleTask(taskId));
  };
  const handleToggleImportant = (taskId: string) => {
    dispatch(toggleImportant(taskId)); // Dispatch toggleImportant action
  };

  // Filter tasks based on the search query and selected filter
  const filteredTasks = tasks.filter(task => {
    const isSearchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isImportant = selectedFilter === 'important' ? task.isImportant : true;
    const isToday = selectedFilter === 'today' ? new Date(task.createdAt).toDateString() === new Date().toDateString() : true;
    const isAll = selectedFilter === 'all';

    // Apply filters
    return isSearchMatch && (isAll || (selectedFilter === 'important' && task.isImportant) || (selectedFilter === 'today' && isToday));
  });
  return (
    <div className="flex min-h-screen bg-[#f7f9f7]">
      {/* Sidebar */}
      <div className={` ${isNavVisible ? "w-72 ":"w-20 "} bg-[#f7f9f7] border-r border-gray-200 p-6 transition-all ease-out hidden xl:block`}>
        <div className="flex items-center gap-2 mb-8">
          <button onClick={() => setIsNavVisible(pre => !pre)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <div className={` ${isNavVisible?"block":"hidden"} flex items-center gap-2`}>
            <img src="/logo.svg" alt="DoIt" className="h-8" />
            <span className="text-xl font-semibold text-green-600">DoIt</span>
          </div>
        </div>

        <div className={`transition-all ${isNavVisible ? 'block' : 'hidden'}`}>
          <div className=" flex justify-center items-center flex-col relative -top-7 mt-10">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
              className="w-[90px] h-[90px] rounded-full  object-cover"
            />
            <h2 className="text-lg font-semibold">Hey, ABCD</h2>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button onClick={() => setSelectedFilter('all')} className={`w-full flex items-center gap-3 px-4 py-2 ${selectedFilter === 'all' ? 'bg-[#e8efe8]' : 'text-gray-700 hover:bg-gray-100'} rounded-lg`}>
              <ClipboardList />
              <span>All Tasks</span>
            </button>
            <button onClick={() => setSelectedFilter('today')} className={`w-full flex items-center gap-3 px-4 py-2 ${selectedFilter === 'today' ? 'bg-[#e8efe8]' : 'text-gray-700 hover:bg-gray-100'} rounded-lg`}>
              <Calendar className="w-5 h-5 text-gray-600" />
              <span>Today</span>
            </button>
            <button
              onClick={() => setSelectedFilter('important')}
              className={`w-full flex items-center gap-3 px-4 py-2 ${selectedFilter === 'important' ? 'bg-[#e8efe8]' : 'text-gray-700 hover:bg-gray-100'} rounded-lg`}
            >
              <Star />
              <span>Important</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Map />
              <span>Planned</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <div className="w-5 h-5 text-gray-600">👤</div>
              <span>Assigned to me</span>
            </button>
          </nav>

          <button className="w-full flex items-center gap-3 px-4 py-2 mt-6 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Plus />
            <span>Add list</span>
          </button>

          <div className="mt-8 p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Today Tasks</span>
              <button className="text-gray-400 hover:text-gray-600">ⓘ</button>
            </div>
            <div className="text-2xl font-bold mb-4">{tasks.length}</div>
            <div className="w-full h-32 relative">
              <div className="mt-4 flex justify-center">
                <div className="relative w-[120px] h-[120px]">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3F9142"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#1D3520"
                      strokeWidth="4"
                      strokeDasharray={`${(completedTasks.length / tasks.length) * 100}, 100`}
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Pending ({pendingTasks.length})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span>Done ({completedTasks.length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ">
        <header className="flex justify-between items-center p-4 border-b border-gray-200 ">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">To Do</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">▼</button>
          </div>
          <div className="flex items-center gap-4">
            {showserchbar &&
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="px-3 py-1 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            }
            <Search className="w-5 h-5 text-gray-500" onClick={() => setShowserchbar(pre => !pre)} />

            <Grid3X3 className="w-5 h-5 text-gray-500" onClick={() => setIsGridView(prev => !prev)} />
            <Moon className="w-5 h-5 text-gray-500" />
          </div>
        </header>

        <div className='flex '>
          <main className="p-6  w-full">
            {/* Task Input */}
            <div className="rounded-lg p-4 mb-6 h-[17vh] flex flex-col justify-between bg-[#EEF5EE]">
              <div className="flex items-center justify-between mb-4 ">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add A Task"
                  className="bg-transparent text-lg focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <RotateCcw className="w-5 h-5 text-gray-500" />
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    ADD TASK
                  </button>
                </div>
              </div>
            </div>

            {/* Display Tasks */}
            <div className={`p-2 ${isGridView ? 'grid grid-cols-4 gap-5 md:grid-cols-3' : 'flex flex-col'}`}>
              {filteredTasks.filter(task => !task.completed).map((task) => (
                <div key={task.id} className={`flex p-2 items-center justify-between py-3 ${isGridView ? "border-2 h-[90px] rounded-xl" : "border-b h-[75px]"} border-gray-200 cursor-pointer`}>
                  <div onClick={() => setView(pre => !pre)} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span onClick={() => handleTaskClick(task)}>{task.title}</span>
                  </div>
                  <button onClick={() => handleToggleImportant(task.id)} className="p-2">
                    <Star className={`${task.isImportant ? 'text-green-700' : 'text-black'}`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-gray-500 mb-4">Completed</h3>
              {filteredTasks.filter(task => task.completed).map((task) => (
                <div key={task.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="bg-red-900 w-5 h-5"
                    />
                    <span className="line-through text-gray-500">{task.title}</span>
                  </div>
                  <button className="p-2">
                    <Star className={` ${task.isImportant ? 'text-green-700' : 'text-black'}`} />
                  </button>
                </div>
              ))}
            </div>
          </main>
          <div
            className={`transition-all duration-300 ease-in-out ${selectedTask ? 'w-[400px] hidden xl:block' : 'w-0'} `}
          >
            <TaskDetailPanel isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} task={selectedTask} />
          </div>
        </div>
        {
          view && (
            <div className={` ${selectedTask ? 'bg-black  xl:hidden' : 'w-0'} fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 h-screen  z-20 `} >
              <div className="flex justify-center items-center ">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    stiffness: 1,
                  }}
                  className="bg-white   rounded-t-3xl p-5 w-full absolute bottom-0 h-[65vh]  "
                >
                  <TaskDetailPanel isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} task={selectedTask} />
                </motion.div>
              </div>
            </div>


          )
        }
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
};

export default App;
