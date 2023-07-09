import React , {useContext} from 'react'
import NoteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const note = props.note;
  const updateNote = props.updateNote;
  const eraseNote = props.eraseNote;

  const context = useContext(NoteContext);
  const {deleteNote} = context;

  return (
    <div className='col-md-4'>
       {/* <h5>{note.title}</h5> */}
       <div className="card my-3 jkbAqT">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className='hZbtBi'>
                       <h5 className="card-title link-warning my-2"><strong>{note.title}</strong></h5>
                    </div>
                    <i className="fa-sharp fa-regular fa-trash-can fa-inverse mx-2" onClick={()=>{eraseNote(note._id)}}></i>
                    <i className="fa-sharp fa-regular fa-pen-to-square fa-inverse mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
                <div>
                   <p className="card-text fs-5 link-light">{note.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Noteitem
