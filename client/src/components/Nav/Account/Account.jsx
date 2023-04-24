import IconCart from "../IconCart";
import { Link } from "react-router-dom";
import s from '../Nav.module.css'

import { useDispatch,useSelector } from "react-redux";


export default function Account({ user }) {
    const userr =useSelector(state=>state.user)
    /* const dispatch= useDispatch()
    useEffect(() => {
    dispatch(UserSessionVer())
    }, []) */
    const image = window.localStorage.getItem('user_session')
    const imgUser = JSON.parse(image)

    
    const condicion = user.rol==='admin'? true:false
    return (
        <div className={s.items}>
            <Link to={`/user-profile/${user.name}`} className="link">
                <div className={s.account} style={{ backgroundImage: `url(${imgUser.image})` }}></div>
            </Link>

            <div className={s.icon} title="Ir al carrito">
                <Link to={"/shopping-cart"} hidden={condicion}>
                    <IconCart />
                </Link>
            </div>
        </div>
    )
}