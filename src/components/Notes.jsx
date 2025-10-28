import React, { useEffect, useState } from 'react'

const Notes = () => {
    const[notes,setNotes] = useState(()=>
    {
        const saved = localStorage.getItem("notes")
        return saved ? JSON.parse(saved) :[]
    })

    const[text,setText] = useState("")
    const[activeNote,setActiveNote] = useState(null)

    useEffect(()=>{
        localStorage.setItem("notes",JSON.stringify(notes))
    },[notes])

    useEffect(()=>{
        const syncNotes = (e) => {
            if(e.key === "notes"){
                setNotes(JSON.parse(e.newValue))
            }
        }
        window.addEventListener("storage",syncNotes)
        return () => window.removeEventListener("storage",syncNotes)
    },[])

    const saveNote = () => {
        if(!text.trim()) return 
        if(activeNote != null ){
            const updated = [...notes]
            updated[activeNote] = text
            setNotes(updated)
        }else{
            setNotes([...notes,text])
        }
        setText("")
        setActiveNote(null)
    }

    const deleteNote = (index) => {
       const updated = notes.filter((_,i)=>i !== index)
       setNotes(updated)
    }
  return (

    <div className='min-h-screen text-white flex flex-col items-center p-6  bg-gradient-to-br from-gray-900 via-indigo-900 to-black'>
      <div className='w-full max-w-3xl bg-white/10 backdrop-blur-lg shadow-2xl p-8'>
       
       <h1 className='text-3xl font-bold tect-center text-indigo mb-4'>Real Time notes</h1>

       <textarea 
        value={text}
        onChange={(e)=>setText(e.target.value)}
        className='w-full h-32 text-white rounded-xl mb-4 border border-2px-white p-4'
        placeholder='type your notes here....'
       ></textarea>

       <div className='flex justify-between '>
        <button 
        onClick={saveNote}
        className='bg-indigo-600 px-5 py-2 rounded-xl'>Save Notes</button>
        <button 
        onClick={()=>{
            setText("")
            setActiveNote(null)
        }

        }
        className='bg-indigo-600 px-5 py-2 rounded-xl'>clear</button>

       </div>

       <h2 className='text-xl font-bold mt-6 mb-3 text-indigo-300'>Saved Notes</h2>


       <div className='grid gap-3'>
        {notes.length > 0 ? (
            (notes.map((note,index)=>(

            <div 
            key={index}
            className='bg-black/40 p-3 rounded-xl flex justify-between items-center'>
            <p className='text-gray-200 truncate w-3/4 '>{note}</p>
            <div className='flex gap-2'>
              <button 
              onClick={()=>{
                setText(note)
                setActiveNote(index)
              }}
              className='bg-yellow-500 px-3 py-1 rounded-lg'>Edit</button>
              <button 
              onClick={()=>deleteNote(index)}
              className='bg-red-500 px-3 py-1 rounded-lg'>Delete</button>
            </div>
        </div>)))
        ) : (
            <p>No Note found</p>
        )}
       </div>
    </div>
    </div>
  )
}

export default Notes