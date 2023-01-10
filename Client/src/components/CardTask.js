import axios from "axios";
import React from "react";
import { useState } from "react";
import AddTaskInput from "./AddTask";
import EditTask from "./EditTask";

export default function CardTask(props) {
  const { todoId, title, task } = props;

  const [show, setShow] = useState(false);

  const onDeleteTask = async (id) => {
    await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/deleteTask/${todoId}/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log(response);
        // setDeletes(true);
        props.todoRefresh();
      })
      .catch((error) => {
        console.log(error);
        // setDeletes(false);
      });
  };

  const onDeleteTodo = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/deleteTodo/${todoId}`, {
        withCredentials: true,
      })
      .then((response) => {
        // setDeletes(!deletes);
        props.todoRefresh();
        // console.log("CT", props);
      })
      .catch((error) => {
        console.log(error);
        // setDeletes(false);
      });
  };

  if (!todoId) {
    return (
      <section className="bg-white dark:bg-zinc-900 mt-2 md: mt-10 w-full ">
        <div className="container w-3/4 px-6 py-10 mx-auto">
          <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">
            List of Todos
          </h1>
          <div className="mt-12 space-y-8">
            <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700"></div>

            <h1 className="text-4xl font-semibold text-center text-gray-800 py-10 dark:text-white">
              Your todo looks empty add some todos
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="mt-12 space-y-8 ">
      <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-between w-full p-2 md:p-8">
          <h1
            className="font-semibold text-gray-700 dark:text-white"
            // key={key}
          >
            {title}
          </h1>

          <div className="flex flex-row justify-end">
            <div className="hidden md:flex md:mr-3">
              <AddTaskInput
                // key={key}
                id={todoId}
                refresh={props.todoRefresh}
              />
            </div>
            <div className=" flex flex-row text-center ">
              <button className="mr-2" onClick={onDeleteTodo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc0d0d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
            <div className="flex flex-row">
              <button
                className="text-white "
                // key={todo_id}
                onClick={() => setShow((show) => !show)}
              >
                {show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-white-700" />
        <div className=" flex flex-row justify-center  md:hidden w-full">
          <AddTaskInput id={todoId} refresh={props.todoRefresh} />
        </div>

        {show ? (
          <div className=" overflow-auto max-h-80 scroll-smooth hover:scroll-auto">
            {task.map((taskData) => {
              // console.log(taskData._id, index);
              return (
                <div
                  key={taskData._id}
                  className="flex flex-row border-2 border-gray-100 rounded-lg dark:border-gray-700 m-2 md:mx-2 my-2 justify-between "
                >
                  <EditTask
                    taskData={taskData}
                    todo_id={todoId}
                    refresh={props.todoRefresh}
                  />
                  <div className="flex flex-row items-center">
                    <button
                      className=" text-white font-bold m-2 items-center "
                      onClick={() => onDeleteTask(taskData._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#dc0d0d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                // </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
