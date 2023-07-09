import React, {useState} from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/Home'
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Public from './components/Public'

function App() {
   
  // const [alert, setAlert] = useState(null);

  // const showAlert = (message, type)=>{
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  //   setTimeout(() => {
  //    setAlert(null);
  //   }, 1500);
  // }

  return (
    <>
      {/* using Context API we can provide state of NoteState to every where just by importing NoteContext and useContext() to it  */} {/* Assume it to be as declaring a global state */}
      <NoteState>
        <BrowserRouter>
          <Navbar/>
          <Alert message='This is awesome note making app'/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />   {/* exact is used to avoid misjudgement of Route i.e give it when exactly that path is requested */}
            <Route exact path="/about" element={<About />} />
            <Route exact path="/public" element={<Public/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App




