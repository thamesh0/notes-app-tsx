import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { NewNote } from './pages/NewNote';
import { useState } from 'react';
import './styles/App.css';
import { Home } from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new' element={<NewNote/>}/>
        <Route path='/:id'>
          <Route index element={<h1>Show</h1>}/>
          <Route path='edit' element={<h1>Show</h1>}/>
        </Route>
        <Route path='*'element={<Navigate to='/'/>}/>
      </Routes>

      </Router>
    </div>
  )
}

export default App
