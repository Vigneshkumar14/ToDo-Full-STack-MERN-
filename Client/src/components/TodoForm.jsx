import React, {  useEffect, useState } from 'react'

export default function TodoForm({postApi,message}) {

    const [title, setTitle] = useState("");
    const [task, setTask] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
   useEffect(()=>{
    if (message && message === "Todo created successfully"){

      setSuccessMessage(message);
      
    } else if (message){
      setErrMessage(message);
    }
   },[message])
   

    const sendApi = async()=>{
      try{
      if(!title || !task){
        throw Error(["Please enter title and task"])
      }


            

        const datas = {todoTitle: title, todoTask: task};

       let a  = postApi(datas);

       a.then((res)=>{
        if (res){setSuccessMessage(res)}})
        
        
        
        
       

    }
    catch(error){
      setErrMessage (error.message);
      

    }}
   

  const handleSubmit = async(event)=>{
    event.preventDefault();
    setErrMessage("");
    setSuccessMessage("");
    sendApi();

    setTitle("");
    setTask("")
    setInterval(() => {
      setSuccessMessage("");  
    },5000);


  }
  return (
    <div className=" w-3/4 md:w-2/4">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Todo Title
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="todoTitle" name="todoTitle" type="text" placeholder="Enter your todo's title here"
      value={title} onChange={(e)=>setTitle(e.target.value)}
       />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Todo Task Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="todoTask" name="todoTask" type="text" placeholder="Enter your todo's task here" 
      value={task} onChange={ (e)=>setTask(e.target.value)}/>
      {errMessage && (<p className="text-red-500 text-md italic text-center md:text-lg"> {errMessage}</p>)} 
      {successMessage && (<p className="text-green-500 text-md italic text-center md:text-lg"> {successMessage}</p>)} 



     

    </div>
    <div className="flex items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
        Submit
      </button>
     
    </div>
  </form>

</div>
  )
}
