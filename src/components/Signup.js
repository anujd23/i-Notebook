import React, { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';


const Signup = () => {
   
   const host = 'http://localhost:5000/'
   const navigate = useNavigate();

   const context = useContext(NoteContext);
   const {showAlert} = context;


   const [credentials, setCredentials] = useState({name:"", email:"", password:"",cpassword:""});

   const onChange =(e)=>{
    // const newcredential = {...credentials, [e.target.name]:e.target.value};
    setCredentials({...credentials, [e.target.name]:e.target.value});
   }

   const handleSubmit = async(e)=>{
        e.preventDefault();
        if(credentials.password!==credentials.cpassword){
            showAlert("Invalid Detail", 'danger');
        }else{
            const response = await fetch(`${host}api/auth/createuser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: credentials.name, email:credentials.email, password:credentials.password}), 
            });
            const json = await response.json();  
            console.log(json);
            
            if(json.success===true){
                localStorage.setItem('token', json.authtoken);
                showAlert("Your account has been created successfully", 'success');
                navigate("/login");
            }
        }
    }

  return (
    <div className='container'>
         <h2 className='link-light my-2'>Create an Account to Use iNotebook</h2>
       <form className = 'login-form' onSubmit={handleSubmit} style={{ maxWidth: "800px" }}>
            <div className="link-light mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" ><strong>Name</strong></label>
                <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="name" onChange={onChange}/>
            </div>
            <div className="link-light mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email address</strong></label>
                <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="email"/>
            </div>
            <div className="link-light mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' minLength={5} id="password" required/>
            </div>
            <div className="link-light mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label"><strong>Confirm Password</strong></label>
                <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name='cpassword' minLength={5} id="cpassword" required/>
            </div>
            <button type="submit" className="btn btn-primary my-4">Submit</button>
        </form>
    </div>
  )
}

export default Signup
