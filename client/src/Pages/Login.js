import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [input,setInput] = useState({
    email:'',
    password:''
  })
  const handleLogin = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('https://blog-app-2bll.onrender.com/api/user/login',input)
      alert(res.data.message);
      // console.log(res.data);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('username',res.data.name);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <>
    <div className='container-shadow'>
      <h2 className='text-center my-3'>Sign up here</h2>
      <div className='col-md-12 my-3 d-flex items-center justify-content-center'>
        <div className='row'>
          <form onSubmit={handleLogin}>
            <div className='mb-3'>
              <label htmlFor='formGroupExampleInput' className='form-label'>Email</label>
              <input type='text'
              name='email'
              value={input.email}
              onChange={(e)=>{
                setInput({...input,[e.target.name]:e.target.value})
              }}
              className='form-control'
              id='formGroupExampleInput'
              placeholder='enter email'>
              </input>
            </div>
            <div className='mb-3'>
              <label htmlFor='formGroupExampleInput' className='form-label'>Password</label>
              <input type='text'
              name='password'
              value={input.password}
              onChange={(e)=>{
                setInput({...input,[e.target.name]:e.target.value})
              }}
              className='form-control'
              id='formGroupExampleInput'
              placeholder='enter password'>
              </input>
            </div>
            <div className='mb-3'>
              <button type='submit' className='btn btn-primary btn-block'>Sign Up</button>
              </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login