"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useState } from "react";


export default  function page() {
  const router = useRouter()
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!title || !description){
      alert("Title and description are required.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/topics",{
      method: "POST",
      headers: {
        "Content-type":"application/json",
      },
      body: JSON.stringify({title,description}),
    });

      if(res.ok){
        router.push('/');
      }else{
        throw new Error("Failed to create a topic");
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" action="">
        <input 
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
          type="text" className="border border-slate-500 px-8 py-2" placeholder="Topic Title" />
        <input 
          onChange={(e)=>setDescription(e.target.value)}
          value={description}
          type="text" className="border border-slate-500 px-8 py-2" placeholder="Topic Description" />
        <button type="submit" className='text-white py-3 px-6 bg-green-600 font-bold w-fit'>Add Topic</button>
    </form>
  )
}
