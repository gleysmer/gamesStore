import s from './random.module.css'

export default function RandomGame() {
    return (
        <div className={s.container}>
            <h1>¿No sabés qué jugar?</h1>
            <h2 style={{textAlign: 'center'}}>Encontrá un juego random ➝</h2>
        </div>
    )
}