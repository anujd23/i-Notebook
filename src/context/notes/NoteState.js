import NoteContext from "./noteContext";
import { useState} from "react";

const NoteState = (props)=>{
    const host = 'http://localhost:5000/'
    
    let notesInitial = []

      const [notes, setNotes] = useState(notesInitial);
      const [alert, setAlert] = useState(null);

      const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
        setAlert(null);
        }, 1500);
      }

        // Add a note
        const getNotes = async ()=>{
            // TODO api call
            const response = await fetch(`${host}api/notes/fetchallnote`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token'),
                },
              });
    
              const json = await response.json();
              // console.log(json);
              setNotes(json);
          }

      // Add a note
      const addNote = async (title, description, tag)=>{
        // TODO api call
        const response = await fetch(`${host}api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({title, description, tag}), 
          });

           const note = await response.json();
           setNotes(notes.concat(note));
      }

      // Delete a note
      const deleteNote = async (id)=>{
         // API call
         const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token'),
            },
          });
         const json = response.json();
         setNotes(json);

        //  console.log("deleting the note with id"+id);
         const newNotes = notes.filter((notes)=>{return notes._id!==id});
         setNotes(newNotes);
      }

      // Edit a note
      const editNote = async (id, title, description, tag)=>{
        // API call
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({title, description, tag}), 
          });
          const json = await response.json();
          setNotes(json);
          
        //Logic to edit
        let newNotes = JSON.parse(JSON.stringify(notes));
        for(let index=0; index<notes.length; index++){
            // const newNotes = notes[index];
            if(newNotes[index]._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }

        setNotes(newNotes);
      }

    return(
        // the value provided can be fetched out to anywhere by just importing NoteContext and use it (similar to global declaration)
        //passing useState through the Context API
        <NoteContext.Provider value = {{notes, alert, addNote, deleteNote, editNote, getNotes, showAlert}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;