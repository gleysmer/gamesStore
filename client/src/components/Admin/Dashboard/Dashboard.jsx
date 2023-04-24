import Menu from "../Menu/Menu"
import s from './dashboard.module.css'

export function Dashboard() {
    return (
        <div className={s.container}>
            <Menu />
            <div className={s.text}>
                <h1 style={{fontSize: '80px', margin: '0'}}>GAMERS STORE</h1>
                <h2 style={{margin: '0'}}>admin dashboard</h2>
            </div>
        </div>
    )
}