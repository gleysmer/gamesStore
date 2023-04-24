import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../redux/actions'
import s from './jumbotron.module.css'

export default function Jumbotron() {
    const dispatch = useDispatch()
    const history = useHistory()
    const navigateTo = (url) => {
        history.push(url)
    }

    let a = Date.now()
    let today = new Date(a)
    let date = today.toDateString()

    useEffect(() => {
        dispatch(getProducts())
    }, [date])

    return (
        <div className={s.container}>
            <h1 className={s.title}>Mira nuestras ofertas diarias! - {date}</h1>
            <p className={s.pr}>
                Nuevas ofertas todos los días ¡Descubrelas!
            </p>
            <button className={s.button} onClick={() => navigateTo('/shopping/daily-offers')} >¡Buscar!</button>
        </div>
    )
}