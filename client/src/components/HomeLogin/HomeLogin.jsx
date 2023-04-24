import FormLogIn from '../FormLogIn/FormLogIn'
import s from './homelogin.module.css'

export function HomeLogin() {
    return (
        <div className={s.container}>
            <h1 className={s.title}>GAMERS STORE</h1>
            <FormLogIn />
        </div>
    )
}