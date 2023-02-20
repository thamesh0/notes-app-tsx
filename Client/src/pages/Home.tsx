import React, { useEffect, useState } from 'react'

export const Home = () => {

    const [title, setTitle] = useState("");

    async function fetchCards() {
        await fetch("http://localhost:5000/get-deck") 
    }
    useEffect(() => {
        console.log("We are here")
        fetchCards();     
        return () => {
            console.log("cleanup")
        }
    }, [])
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
            <label htmlFor="title" className="create-card">Card Title</label>
            <input className="create-card input-field" type="text" value= {title} id="title" onChange={
                (e: React.ChangeEvent<HTMLInputElement>)=> {
                    // TODO: Save typed data
                     setTitle(e.target.value);
                }
            }/>
            <button className="create-card">Create Card</button>
        </form>
    </div>
  )
}
