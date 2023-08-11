"use client"

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function EditTopicForm({id,title,description}) {
  const router = useRouter();
  const [newTitle,setNewTitle] = useState(title);
  const [newDescription,setNewDescription] = useState(description);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
        method:"PUT",
        headers:{

          "Content-type":"application/json",
        },
        body: JSON.stringify({newTitle,newDescription}),
      });
      if(!res.ok){
        throw Error("Error Update Topic");
      }
      router.refresh();
      router.push('/');
    }catch(error){
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" action="">
        <input 
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          type="text" className="border border-slate-500 px-8 py-2" placeholder="Topic Title" />
        <input 
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          type="text" className="border border-slate-500 px-8 py-2" placeholder="Topic Description" />
        <button className='text-white py-3 px-6 bg-green-600 font-bold w-fit'>Update Topic</button>
    </form>
  )
}
