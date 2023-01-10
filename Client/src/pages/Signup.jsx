import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [user, setUser] = useState({ name:"",email: "", password: "" });
    const [errMessage,setErrMessage] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
            if( !user.name || !user.email || !user.password){
          throw new Error("Please enter Email and Password")}

          
          

        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`,{name:user.name,email:user.email,password:user.password},{
            withCredentials: true
         }).then( (response)=>{

            
            if(response.data.success){
                const now = new Date()
	            const data = {
		        Name: response.data.user.name,
		        expiry: now.getTime() + (2 * 60 * 60 * 1000),
	            }
	        localStorage.setItem('user', JSON.stringify(data))
            return  navigate("/dashboard");}
            
        }).catch((err)=>{
             
            setErrMessage(err.response.data.message)
        })

           
        }
        
        catch (err){
           
            setErrMessage(err.message);            
        }

        
    };

    return (
        <div className='h-screen bg-zinc-900 text-white '>
             <div className="bg-zinc-900 text-white text-center p-5 md:p-10">       
            <h1 className="font-sans block text-md text-center font-extrabold md:text-2xl">TODO</h1>       
            </div>
            <div className=' bg-zinc-900 text-white w-full max-w-md m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className=' text-2xl font-medium mt-4 mb-12 text-center'>
                    Enter the details to sign Up
                </h1>

                <form className="bg-zinc-900 text-white " onSubmit={handleFormSubmit}>
                <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            className={ ` bg-zinc-900 text-white  w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='name'
                            placeholder='Your Name'
                            value={user.name} onChange={ (e)=> setUser({...user,name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className={ ` bg-zinc-900 text-white  w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                            value={user.email} onChange={ (e)=> setUser({...user,email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`bg-zinc-900 text-white w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            value={user.password}
                            onChange = {(e)=> setUser({...user,password:e.target.value})}
                        />
                    </div>
                    <p>Don't have an account <Link to="/login" className="text-blue-600">Login Here</Link></p>

                    {errMessage && (<p className="text-red-500 text-md italic text-center md:text-lg"> {errMessage}</p>)} 

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}