import React from 'react'
import axios from 'axios';
import { useState } from 'react';



const AddTaskInput = (props) => {
    const {id} = props;

    const [newTask, setNewTask] = useState("");


const addTask = async() => {
    try {
      if (!newTask) throw Error("Enter Task");
       
      await axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/updateTask/${id}`, { todoTask: newTask },{
          withCredentials: true
       })
        .then((response) => props.refresh())
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    setNewTask("");
  };

    return (
        <div className="flex flex-row p-2 justify-center">

    
        <div className='flex'>
        <input
          type="text"
          className=" bg-zinc-900 p-2 text-white "
          placeholder="Enter the task to add"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }}}
        /></div>
        

        <button
        
          
          className=" bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md"
          onClick={addTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6" />
            <path d="M14 3v5h5M18 21v-6M15 18h6" />
          </svg>
        </button>
       
      
      </div>
    );
  };

  export default AddTaskInput;