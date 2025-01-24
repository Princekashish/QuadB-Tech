import React, { useState } from 'react'
import { Bell, Calendar, Plus, RotateCcw, Star, Trash2, X } from 'lucide-react'
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { removeTask } from '../store/slices/tasksSlice';

interface TaskDetailPanelProps {
    isOpen: boolean
    onClose: () => void
    task: {
        id: string
        text: string
        completed: boolean
        important: boolean
    } | null
}

export const TaskDetailPanel: React.FC<TaskDetailPanelProps> = ({ isOpen, onClose, task }) => {
    if (!task) return null


    const [dueDate, setDueDate] = useState<string | null>(null); // Store the selected due date
    const [showCalendar, setShowCalendar] = useState<boolean>(false); // Control visibility of the calendar
    const [reminder, setReminder] = useState<Date | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [newStep, setNewStep] = useState<string>('');
    const dispatch = useDispatch()

    const handleAddStep = () => {
        if (newStep.trim()) {
            setSteps(prevSteps => [...prevSteps, newStep.trim()]);
            setNewStep('');
        }
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value); // Set the selected date
        setShowCalendar(false); // Hide the calendar after selection
    };


    const handleRepeatTask = () => {
        // You can duplicate the task with the same details, adjust this to your task creation logic
        console.log("Repeat Task: ", task);
        // Example: create a new task with the same properties
    };
    const handleDeleteTask = (taskId: string) => {
        dispatch(removeTask(taskId)); // Dispatch the delete action
        onClose();
    };

    return (
        <div >
            <div className={`hidden xl:block ${isOpen ? 'block' : 'hidden'}`} onClick={onClose} >
                <div className="w-full sm:w-[400px]  p-4 rounded-lg" onClick={(e) => e.stopPropagation()} >
                    <div className="flex flex-col h-full">
                        <div className="flex-shrink-0  ">
                            <div className="flex items-center justify-between ">
                                <button onClick={onClose}>
                                    <X className="h-4 w-4" />
                                </button>
                                <h2 className="text-left text-lg  font-medium">{task.title}</h2>
                                <button  >
                                    <Star className="h-4 w-4" />
                                </button>
                            </div>

                        </div>

                        <div className="flex-1 py-4">

                            {/* // Add your task details here */}
                            <div className='border-b py-2'>
                                <button onClick={handleAddStep} className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors">
                                    <Plus className="h-4 w-4" />
                                    Add Step
                                </button>
                                <div>
                                    {steps.length > 0 && (
                                        <ul className="list-disc pl-6">
                                            {steps.map((step, index) => (
                                                <li key={index}>{step}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            {/* reminder */}
                            <div className='border-b py-2'>
                                <button
                                    className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors"
                                    onClick={() => setReminder(new Date())} // Open a date-time picker for reminder
                                >
                                    <Bell className="h-4 w-4" />
                                    Set Reminder
                                </button>
                                {reminder && (
                                    <div className='text-sm'>
                                        <label>Reminder Set For: </label>
                                        <span >{dueDate}</span>
                                    </div>
                                )}

                            </div>
                            <div className='border-b py-2'>

                                <button onClick={() => setShowCalendar(prev => !prev)} className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors">
                                    <Calendar className="h-4 w-4" />
                                    Add Due Date
                                </button>
                                {showCalendar && (
                                    <div className="relative mt-2">
                                        <input
                                            type="date"
                                            value={dueDate || ''}
                                            onChange={handleDateChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                )}

                                {dueDate && (
                                    <div>
                                        <span className="text-sm">Selected Due Date: {new Date(dueDate).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <button onClick={handleRepeatTask} className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors">
                                    <RotateCcw className="h-4 w-4" />
                                    Repeat
                                </button>
                            </div>

                            <hr className="my-4" />

                            <div className="space-y-4 ">
                                <input type='textarea' placeholder="Add Notes" className="w-full h-[10vh] px-4 rounded-2xl border outline-none resize-none bg-white" />
                            </div>
                        </div>

                        <div className="flex-shrink-0 pt-4">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div>Created Today</div>
                                <button onClick={() => handleDeleteTask(task.id)}  >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`xl:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={onClose} >
                <div className="w-full sm:w-[400px] md:w-full  p-4 rounded-lg" onClick={(e) => e.stopPropagation()} >
                    <div className="flex flex-col h-full ">
                        <div className="flex-shrink-0  ">
                            <div className="flex items-center justify-between ">
                                <button onClick={onClose}>
                                    <X  />
                                </button>
                                <h2 className="text-left text-lg  font-medium">{task.title}</h2>
                                <button  >
                                    <Star />
                                </button>
                            </div>

                        </div>

                        <div className='overflow-y-scroll'>
                            <div className="flex-1 py-4 b">

                                {/* // Add your task details here */}
                                <div className='border-b py-2'>
                                    <button onClick={handleAddStep} className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors">
                                        <Plus className="h-4 w-4" />
                                        Add Step
                                    </button>
                                    <div>
                                        {steps.length > 0 && (
                                            <ul className="list-disc pl-6">
                                                {steps.map((step, index) => (
                                                    <li key={index}>{step}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                {/* reminder */}
                                <div className='border-b py-2'>
                                    <button
                                        className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors"
                                        onClick={() => setReminder(new Date())} // Open a date-time picker for reminder
                                    >
                                        <Bell className="h-4 w-4" />
                                        Set Reminder
                                    </button>
                                    {reminder && (
                                        <div className='text-sm'>
                                            <label>Reminder Set For: </label>
                                            <span >{dueDate}</span>
                                        </div>
                                    )}

                                </div>
                                <div className='border-b py-2'>

                                    <button onClick={() => setShowCalendar(prev => !prev)} className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors">
                                        <Calendar className="h-4 w-4" />
                                        Add Due Date
                                    </button>
                                    {showCalendar && (
                                        <div className="relative mt-2">
                                            <input
                                                type="date"
                                                value={dueDate || ''}
                                                onChange={handleDateChange}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    )}

                                    {dueDate && (
                                        <div>
                                            <span className="text-sm">Selected Due Date: {new Date(dueDate).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button onClick={handleRepeatTask} className="w-full flex items-center gap-3 px-1 py-3 text-sm text-left hover:bg-white rounded-lg transition-colors">
                                        <RotateCcw className="h-4 w-4" />
                                        Repeat
                                    </button>
                                </div>

                                <hr className="my-4" />

                                <div className="space-y-4 ">
                                    <input type='textarea' placeholder="Add Notes" className="w-full h-[10vh] px-4 rounded-2xl border outline-none resize-none bg-white" />
                                </div>
                            </div>

                            <div className="flex-shrink-0 pt-4">
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div>Created Today</div>
                                    <button onClick={() => handleDeleteTask(task.id)}  >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
