import React,{ useContext } from 'react'
import { Link,  useLocation, useNavigate} from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

const Navbar = () => {
 
    const context = useContext(NoteContext);
    const {showAlert} = context;
 
  const navigate = useNavigate();
  let location = useLocation();

  const handleOnClick = async (e)=>{
      e.preventDefault();
    //   showAlert("Logged Out Successfully","success");
      showAlert("Logged Out Successfully","success");
      localStorage.removeItem('token', null);
      navigate('/login');
  }

  return (
    <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                     <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==='/public'?'active':''}`} to="/public">Public</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token')?<form className="d-flex" role="search">
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
                    <Link className="btn btn-warning mx-1" to="/login" role='button'>Login</Link>
                    <Link className="btn btn-warning mx-1" to="/signup" role='button'>Signup</Link>
                </form>:<button onClick={handleOnClick} className='btn btn-warning'>Logout</button>
                }        
                </div>
            </div>
        </nav>
     </div>
  )
}

export default Navbar
