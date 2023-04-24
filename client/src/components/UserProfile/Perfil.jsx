import React, { useState } from 'react'
import './Perfil.css'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

export const Perfil = () => {

  const user_session = window.localStorage.getItem('user_session')
  const user = JSON.parse(user_session)

  const history = useHistory()

    const navigateTo = (url) => {
        history.push(url)
    }
  const [form, setForm]= useState({
    image: '',
    name:'' ,
    surname: '',

  })

  const handleChange = (e, fieldName) =>{
    setForm({
      ...form,
      [fieldName] : e.target.value
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    setForm({
      
      name:'',
      surname:'',
    
    })
    const  sendData = {
      //...user,
      ...form
    }
    console.log(sendData)

    axios.put('http://localhost:3001/userPut/'+ user.id,sendData)
    navigateTo('/home')
    swal("Datos cambios existosamente")
  }

  return (
  <div className='update-profile'>
    <div className='form-profile'>
    <h1>Edit profile</h1>
      <form onSubmit={handleClick}>
      <div>
   
      </div>

      <div className='input-box'>
      {/* <label>Update your pic:</label>
      <input className='box' type='file' accept='image/jpg, image/jpeg, image/png' /> */}
        <label>name :</label>
        <input type='text'name='name' onChange={e => handleChange( e, 'name')} placeholder='enter name' className='box' />
        <label>surname :</label>
        <input type='text' name='surname' onChange={e => handleChange( e, 'surname')} placeholder='enter surname' className='box' />
        {/* <label>old passsword :</label>
        <input type='password' onChange={e => handleChange( e, 'oldPassword')} placeholder='enter previous password' className='box' /> */}
        {/* <label>new passsword :</label>
        <input type='password'  onChange={e => handleChange( e, 'password')} placeholder='enter new password' className='box' /> */}
        <button className='btn-profile'>Update</button>
      </div>
      </form>
    
    </div>
  </div>
  
  
)
  }
