import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom";

import './adminmenu.css'

export default function Menu() {
    const history = useHistory();
    const navigateTo = (url) => {
        history.push(url)
    }

    function signOut() {
        navigateTo('/')
        window.localStorage.removeItem('user_token')
        window.localStorage.removeItem('user_session')
    }

    return (
        <div className='admin-container'>
            <div className='admin-head'>
                <h1 id="admin-title">GAMERS STORE</h1>
                <span id="admin-subtitle">admin</span>
            </div>

            <div className='admin-sections'>
                <div id='admin-list'>
                    <h2>Users</h2>
                    <NavLink to={'/admin-users'}>All users</NavLink>
                </div>
                <div id='admin-list'>
                    <h2>Products</h2>
                    <NavLink to={'/admin-submit-product'}>Submit product</NavLink>
                    <NavLink to={"/admin-product"}>Get Products</NavLink>
                    <NavLink to={'/admin-delete-product'}>Delect Products 2</NavLink>
                </div>
                <div id='admin-list'>
                    <h2>Ordes</h2>
                    <NavLink to={'/admin-Orders'}>GetOrdes</NavLink>
                </div>
            </div>

            <div className='admin-buttons'>
                <button onClick={signOut}>Sign out</button>
                <button onClick={() => navigateTo('/home')}>Home</button>
            </div>
        </div>
    )
}