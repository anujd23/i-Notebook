import React, {useContext} from 'react'
import NoteContext from '../context/notes/noteContext';

const Alert = (props) => {

  const context = useContext(NoteContext);
  const {alert} = context;

  const capatalise =(word)=> {
     if(word=='danger'){
        word = 'error';
     }
     let lower = word.toLowerCase();
     return (lower.charAt(0).toUpperCase()+lower.slice(1));
  }

  return (
     <div style={{height: '50px'}}>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show fixed-top`} role="alert">
            <strong>{capatalise(alert.type)}</strong>: {alert.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
    </div>
  )
}

export default Alert
