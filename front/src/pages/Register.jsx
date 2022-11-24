import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
const navigate = useNavigate();  
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
      });
      const [err,setError] = useState('');
const handleChange = (e) => {
setInputs(el=> ({...el,[e.target.name]:e.target.value}))
}   
const handleSubmit =async (event) => {
event.preventDefault();
try {
	
	const res= await axios.post('/auth/signup',inputs);
  // console.log(res.data);
  navigate('/login');
} catch (error) {
  setError(error.response.data)
}
}   
 
    return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  
    )
}

export default Register