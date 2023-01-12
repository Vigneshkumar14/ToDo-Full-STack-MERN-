import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import TodoForm from '../components/TodoForm'
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import { ImSpinner2 } from "react-icons/im";


export default function Dashboard() {
    const [todo, setTodo] = useState(null);
    const [track, setTrack] = useState(false);
    const [message, setMessage] = useState("");
    const [name,setName] = useState("User");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logoutHandle = async()=>{
      setLoading(true);
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/signout`,{
        withCredentials: true
     }).then((response)=>{
        // console.log(response)
        if (response.data.success){
          localStorage.removeItem("user");
          setLoading(false)
         return navigate("/login");
        }
      }).catch((err)=>{
        alert(err.message)
        return navigate("/login");
      })
    }
  
    const postApi = async (datas) => {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/create`, datas,{
          withCredentials: true
       })
        .then((response) => {
         setMessage(response.data.message);
          setTrack(!track);
        })
        .catch((error) => {
          setMessage(error.message);
        });
      // console.log("After creation", track);
      return message;
        
      // setTrack(false);
    };
  
    const refreshObj = () => {
      setTrack(!track);
      // console.log("refresh");
    };
    
    
  
    useEffect(() => {
      setLoading(true);
     
      const getData = async () => {
        try{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getTodo`, {withCredentials: true});
        // console.log(res.data.success);
        if(res.data.success){
          const itemStr = localStorage.getItem("user")
        if (!itemStr) {
          return null
          }
        const item = JSON.parse(itemStr)
        const now = new Date()
  
        if (now.getTime() > item.expiry) {
          localStorage.removeItem("user")
          return null
          }
  
        setName(item.Name);
  
        if (res.data.data.length > 0) setTodo(res.data.data);
        else setTodo(null);}
        setLoading(false);

        }
        catch(err){
          // console.log(err);
        return navigate("/login");
        }
  
        
      };
      getData();
    }, [track, navigate]);

  
    
 return (
 <>
  { loading ? (
    <>
    
    <div className="flex flex-col bg-zinc-900 text-white jusify-center h-screen items-center">
    <div className="text-center m-auto">
         <ImSpinner2 className=' max-h-max max-w-max mx-auto text-white animate-spin'/>
        <h1 className=' mx-auto'> Loading...</h1>
        </div>
    </div>
    </>
   ) : 
   ( <>
    

    <div className="bg-zinc-900 text-white flex justify-between p-5 md:p-10">
        <div className="flex ">
          <h1 className="font-sans text-md font-extrabold md:text-2xl">TODO</h1>
        </div>
        <div className="flex ">
       
          <button onClick={logoutHandle}>Logout</button>
        </div>
      </div>
      <h1 className='bg-zinc-900 text-white capitalize text-center font-semibold'>Hello {name}</h1>
      <div className="bg-zinc-900 w-full flex flex-col justify-center items-center py-5 md:py-30 ">
        <TodoForm message={message} postApi={postApi}  />
        <Card todo={todo} todoRefresh={refreshObj} />
      </div>
      </>)
   }</>
  )
 };
