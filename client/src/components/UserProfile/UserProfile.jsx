import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import './UserProfile.css'

const UserProfile = () => {
  const user_session = window.localStorage.getItem('user_session')
  const user = JSON.parse(user_session)
  console.log(user)

  const history = useHistory()

  const navigateTo = (url) => {
    history.push(url)
  }

  function signOut() {
    navigateTo('/')
    window.localStorage.removeItem('user_token')
    window.localStorage.removeItem('user_session')
  }


  return (
    <div className='update-profile'>

      <div className='form-profile'>

        <div className='flex'>

          <div className='form-image' style={{ backgroundImage: `url(${user.image})` }}></div>

          <div>
            <h1 style={{ fontWeight: '500' }} >{user.name + ' ' + user.surname}</h1>
            <h2 style={{ fontWeight: '400', fontSize: '23px' }}>{user.email}</h2>
          </div>

          <span>Account creation date: {user.createdAt}</span>

        </div>

        <div>
        <Link to='/user-profile/:user/perfil' ><button>Edit your profile</button></Link>
          
        </div>

        <button style={{ marginBottom: '35px', marginTop: '10px' }} onClick={signOut}>Sign out</button>

      </div>

    </div>
  )
}

export default UserProfile