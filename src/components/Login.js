import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

const Login = () => {

   const host = 'http://localhost:5000/'

   const context = useContext(NoteContext);
   const {showAlert} = context;

   const [user, setUser] = useState({email:"", password:""});
   const navigate = useNavigate();

  const onChange = (e)=>{
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleclick = async (e)=>{
    e.preventDefault();
    const response = await fetch(`${host}api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:user.email, password:user.password}), 
    });
    
    const json = await response.json();
    console.log(json);
    if(json.success===true){
        // store the authtoken and redirect 
        localStorage.setItem('token', json.authtoken);
        showAlert("LoggedIn Successfully", "success");
        navigate("/");
    }else{
        setUser({email:"", password:""});
        showAlert("Invalid credential", "danger");
    }
  }

  return (
    <div className='container my-2'>
       <h2 className='link-light fs-2 my-1'>Login to Continue to iNotebook</h2>
       <form className = 'login-form' onSubmit={handleclick} style={{ maxWidth: "800px" }}>
            <div className="mb-3 my-4">
                <label htmlFor="exampleInputEmail1" className="form-label link-light fs-5 my-3" ><strong>Email address</strong></label>
                <input type="email" className="form-control" id="email" value={user.email} name='email' onChange={onChange} aria-describedby="email"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label link-light fs-5" ><strong>Password</strong></label>
                <input type="password" className="form-control" value={user.password} name='password' onChange={onChange} id="password"/>
            </div>
            <button style={{cursor:'pointer'}} type="submit" className="btn btn-info my-4"><strong>Submit</strong></button>
        </form>
    </div>
  )
}

export default Login


