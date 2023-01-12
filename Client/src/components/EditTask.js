import axios from "axios";
import React, { useState } from "react";

export default function EditTask(props) {
  const taskData = props.taskData;
  const todo_id = props.todo_id;

  const [disabled, setDisabled] = useState(false);
  const [updateValue, setUpdateValue] = useState("");

  const onEditClick = () => {
    // console.log(disabled);
    setDisabled(!disabled);
  };

  const updateTask = async () => {
    if (!updateValue) {
      setDisabled(!disabled);
      return;
    }
    // console.log("Hello Working", todo_id, taskData._id, updateValue);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/editTask/${todo_id}/${taskData._id}`,
        {
          todoTask: updateValue,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log(response);
        props.refresh();
      })
      .catch((error) => {
        console.log(error);
      });

    setDisabled(!disabled);
  };

  if (disabled) {
    return (
      <div className="flex flex-row w-full justify-between">
        <input
          className="p-2 text-sm text-gray-500 bg-zinc-900 dark:text-gray-300 border w-full text-center p-1 md:p-8 md:text-left"
          type="text"
          name="todoTask"
          id="todoTask"
          // key={taskData._id}
          placeholder={taskData.taskItem}
          value={updateValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateTask();
            }
          }}
          onChange={(e) => setUpdateValue(e.target.value)}
        />

        <div className="flex flex-row py-2 px-5 justify-center  items-center md:justify-between ">
          <div>
            <button
              className=" text-white font-bold m-2 px-2  "
              // key={taskData._id}
              onClick={updateTask}
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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row w-full justify-between">
        <p
          className="p-2 text-sm text-gray-500 bg-zinc-900 dark:text-gray-300 text-center p-1 truncate md:p-8 md:text-left"
          type="text"
          name="todoTask"
          id="todoTask"
          // key={taskData._id}
        >
          {taskData.taskItem}
        </p>

        <div className="flex flex-row py-2 px-5 justify-center  items-center md:justify-between ">
          <div>
            <button
              className=" text-white font-bold m-2 px-2  "
              // key={taskData._id}
              onClick={onEditClick}
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
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
