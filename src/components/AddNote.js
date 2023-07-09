import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const {addNote, showAlert} = context;
    
    const [note, setNote] = useState({title:"", description:"", tag:""})

    const onChange = (e)=>{
       setNote({...note, [e.target.name]: e.target.value});
    }
  
    const handleOnclick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        showAlert("Note is Successfully Added",'success');
    }  

  return (
    
    <div className='my-3'>
         <h2 className='text-warning'>Create a Note</h2>

        <form style={{ maxWidth: "800px" }}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label text-light">Title</label>
                <input type="text" className="form-control text-dark blurred" id="title" name="title" aria-describedby="emailHelp" minLength={5} required value={note.title} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label text-light">Description</label>
                <textarea type="text" className="form-control blurred" id="desc" name="description" rows="2" minLength={5} required value={note.description} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label text-light">Tag</label>
                <input type="text" className="form-control blurred" id="tag" name="tag" value={note.tag} aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            {/* <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleOnclick}>Add Note</button> */}
            <div className="container">
            <div >
                <button style={{cursor:'pointer'}} disabled={note.title.length<5 || note.description.length<5} type="submit" className="my-3 btn btn-outline-warning" onClick={handleOnclick}>Add Note</button>
            </div>
            </div>
        </form>
    </div>
  )
}

export default AddNote
