import React, { useState } from 'react'
import TextArea from "@/components/ui/text-area";

function EditPost() {
    const [content, setContent] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-light p-[1rem] px-80 text-gray-dark">
        <h1 className="mt-12 text-6xl">Edit your Post</h1>
        
        

        <div className='flex flex-col justify-center mt-12 w-[2rem] bg-gray-lighter p-[2.25rem] w-[41.25rem] items-center rounded-md drop-shadow space-y-[1rem] '>
            <p> Create post as : <span className='text-blue-primary'>Zaki Yudhistira Candra</span></p>
            <TextArea value={content} onChange={(newValue : string) => setContent(newValue)} maxLength={280} initialRow={6} id={"job history"} placeholder={"What is on your mind ?"}/>
            
            <div className='flex space-x-[1rem]'>
            <button className="bg-blue-primary text-white p-1 pr-4 pl-4 rounded-full hover:bg-blue-secondary">Save Edit</button>
            <button className="bg-red text-white p-1 pr-4 pl-4 rounded-full hover:bg-red-light">Delete</button>
            </div>
        </div>

    </main>
  )
}

export default EditPost