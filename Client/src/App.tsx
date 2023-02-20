import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { useState } from 'react';
import './styles/App.css';

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/decks",
    element: <Home/>
  },
  {
    path: "/decks/:deckId",
    element: <Home/>
  }
]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
