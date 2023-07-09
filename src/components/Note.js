import React, { useState, useContext, useEffect, useRef } from 'react';
import NoteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Note() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote, deleteNote, showAlert } = context;
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      showAlert("You are Logged Out, Please Enter the credential to login again", "danger");
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
  const [button, setButton] = useState(true);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  const eraseNote = (id) => {
    deleteNote(id);
    showAlert("Note is Deleted Successfully", 'success');
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleOnclick = (e) => {
    // console.log("updating the note",note);
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note is Updated Successfully", 'success');
    ref.current.click();
  }

  const handleOnAddnote = () => {
    setButton(null);
  }

  return (
    <>
      {!button && <AddNote />}

      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        {/* Launch static backdrop modal */}
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form style={{ maxWidth: "800px" }}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" minLength={5} required value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  {/* <input type="text" className="form-control" id="edescription"  minLength={5} required name="edescription" value={note.edescription} onChange={onChange} /> */}
                  <textarea className="form-control" id="edescription" minLength={5} required name="edescription" value={note.edescription} onChange={onChange} ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                {/* <button type="submit" className="btn btn-primary my-3" onClick={handleOnclick}>Update</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" refclose={ref} className="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-dark" onClick={handleOnclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='my-3 color-lg'>
        <div className="container" >
          {/*<h2 className='link-light'>Your Notes</h2>
            {button && <div className="container">
            <div className='container'>
              <button style={{ cursor: 'pointer' }} type="submit" className="btn btn-dark" onClick={handleOnAddnote}>Add a Note</button>
            </div>
          </div>}*/}
          {/* <h2 className='link-light'>Your Notes</h2> */}

          <div className="link-light d-flex justify-content-between">
            <h1>Your Notes</h1>
            {button && <button style={{ cursor: 'pointer'}} className="btn btn-outline-warning btn-sm" onClick={handleOnAddnote}>Add a Note</button>}
          </div>

          {/* <button type="button" className="btn btn-primary"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            Custom button
          </button> */}

        </div>
        <div className="row">
          <div className='container'>
            {notes.length === 0 && "No Notes to display"}
          </div>
          {notes.map((note) => {
            return <Noteitem updateNote={updateNote} eraseNote={eraseNote} key={note._id} note={note} />
          })}
        </div>
      </div>

      {/* { button &&  <div className="container">
            <div>
                <button style={{cursor:'pointer'}} type="submit" className="btn btn-dark my-5" onClick={handleOnAddnote}>Add a Note</button>
            </div>
        </div>} */}
    </>
  )
}

export default Note
