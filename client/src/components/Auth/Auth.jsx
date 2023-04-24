import { FcGoogle } from "react-icons/fc";
import s from './auth.module.css'

export default function Auth() {
    const BACK_HOST = 'http://localhost:3001'
    const google = () => { window.open(`${BACK_HOST}/auth/google`, '_self') }

    return (
        <div className={s.container}>
            <button className={s.button_container} onClick={google}>
                <FcGoogle size={30} style={{margin: '0px 7px'}}/>
                <h3 style={{ margin: '0', fontWeight: '600', fontSize: '17px' }}>Continuar con Google</h3>
            </button>
        </div>
    )
}