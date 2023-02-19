import React, { useState } from 'react'

export const Home = () => {

    const [title, setTitle] = useState("");
    async function handleCreateCard(e : React.FormEvent) {
        e.preventDefault()
        if(title && title !== "") {
           await  fetch("http://localhost:5000/deck", {
                method:'POST',
                body: JSON.stringify({
                    title,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }) 
            setTitle("")
        } else {
            alert("Title shouldn't be empty")
        }   
    }
  return (
    <div>
        <form onSubmit={handleCreateCard}>
            <label htmlFor="deck-title">Card Title</label>
            <input type="text" value= {title} id="deck-title" onChange={
                (e: React.ChangeEvent<HTMLInputElement>)=> {
                    // TODO: Save typed data
                     setTitle(e.target.value);
                }
            }/>
            <button>Create Card</button>
        </form>
    </div>
  )
}
