import React, { useEffect, useState } from 'react'
export const Home = () => {

    const [decks,setDecks] = useState([]);
    const [title, setTitle] = useState("");
    const [isEmpty,setIsEmpty] = useState(false);

    async function fetchDecks() {
        // const res = await fetch("http://localhost:5000/get-decks") 
        // const newDecks = await res.json();

        // Promise chaining
        const newDecks = await fetch("http://localhost:5000/get-decks").then((res) => res.json())

        setDecks(newDecks)
    }

    useEffect(() => {
        console.log("We are here")
        fetchDecks();     
        return () => {
            console.log("cleanup")
        }
    }, [])

    async function handleCreateCard(e : React.FormEvent) {
        e.preventDefault()
        if(title && title !== "") {
           await  fetch("http://localhost:5000/decks", {
                method:'POST',
                body: JSON.stringify({
                    title,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }) 
            setTitle("")
            setIsEmpty(false)
        } else {
            // alert("Title shouldn't be empty")
            setIsEmpty(!isEmpty)
        }   
    }

    return (
    // Flex-box centers the entire component 
    <div className='Home'> 
        {/* separate form & alert span */}
        <div className='form-span'>
            <form className="create-deck-form" onSubmit={handleCreateCard}>
                <label htmlFor="title">Deck Title</label>
                <input className="input-field" type="text" value= {title} id="title" onChange={
                    (e: React.ChangeEvent<HTMLInputElement>)=> {
                        // TODO: Save typed data
                        setTitle(e.target.value);
                    }
                }/>
                <button>Create Deck</button>
            </form>
            
            <span className={isEmpty ? 'alert ' : ''}></span> 
        </div>
        <div className="">
            {decks.map((deck) => (
                <li key={deck._id}>{deck.title}</li>
                ),
            )}
        </div> 
    </div>
  )
}
