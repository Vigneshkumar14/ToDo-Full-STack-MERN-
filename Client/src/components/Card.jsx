// import axios from 'axios'
import React from 'react'

import CardTask from './CardTask';


export default function  Card (props) {
    const {todo, todoRefresh} = props;
  // const [loading, setLoading] = useState(false);
  

 
    if (!todo){
        return(
        <section className="bg-white dark:bg-zinc-900 mt-2 md: mt-10 w-full">
        <div className="container w-3/4 px-6 py-10 mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">List of Todos</h1>
        <div className="mt-12 space-y-8">
      <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700"></div>
            
           <h1 className="text-4xl font-semibold text-center text-gray-800 py-10 dark:text-white"> Your todo looks empty add some todos</h1>
    
        </div>
        </div>
        
        </section>)
    }
   
    if(todo)
  return (

    <section className="bg-white dark:bg-zinc-900 mt-2 md: mt-10 w-full">
    <div className="container  px-6 py-10 mx-auto w-full md:w-3/4 ">
    <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">List of Todos</h1>
    <div className='max-h-screen overflow-auto scroll-smooth hover:scroll-auto'>
     { todo.map((todos)=>{
    // console.log(todos._id,index)
      return (
      < CardTask  key = {todos._id} todoId={todos._id} title={todos.title} task = {todos.task} todoRefresh = {todoRefresh}/> )} )}
    </div>
    </div>
    </section>
  )
}

// key = {todos._id}